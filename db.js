// ingest-detailed-results.js
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const Database = require("better-sqlite3");

const DB_FILE = path.join(__dirname, "performance_history.db");
// The file provided was .json, which is a JSONL file (JSON-lines) from k6
const RESULTS_FILE = path.join(__dirname, "results.jsonl");

// --- Database Initialization and Schema Setup ---
const db = new Database(DB_FILE);

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS test_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        start_time TEXT NOT NULL,
        end_time TEXT
    );
    CREATE TABLE IF NOT EXISTS http_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_run_id INTEGER NOT NULL,
        vu_id INTEGER,
        iteration INTEGER,
        method TEXT,
        url TEXT,
        status TEXT,
        duration_ms REAL,
        error TEXT,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (test_run_id) REFERENCES test_runs (id)
    );
    CREATE TABLE IF NOT EXISTS checks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        passes BOOLEAN NOT NULL,
        FOREIGN KEY (request_id) REFERENCES http_requests (id)
    );
`);

// --- Schema Migration ---
// This handles adding the 'end_time' column to an old database file.
try {
  db.exec("ALTER TABLE test_runs ADD COLUMN end_time TEXT");
  console.log(
    "Database schema updated: Added 'end_time' column to 'test_runs'."
  );
} catch (error) {
  if (error.message.includes("duplicate column name")) {
    // This is expected if the column already exists. We can safely ignore it.
  } else {
    // Re-throw any other unexpected errors.
    throw error;
  }
}
console.log("Database schema is ready.");

// --- Main Processing Logic ---
async function processResults() {
  if (!fs.existsSync(RESULTS_FILE)) {
    console.error(
      `Error: Results file not found at '${RESULTS_FILE}'. Run k6 with '--out json=results.json' first.`
    );
    process.exit(1);
  }

  // Start a new test run entry
  const { lastInsertRowid: testRunId } = db
    .prepare("INSERT INTO test_runs (start_time) VALUES (?)")
    .run(new Date().toISOString());
  console.log(`Created new test run with ID: ${testRunId}`);

  // Prepare INSERT statements for performance
  const insertRequest = db.prepare(
    `INSERT INTO http_requests (test_run_id, vu_id, iteration, method, url, status, duration_ms, error, timestamp)
         VALUES (@test_run_id, @vu_id, @iteration, @method, @url, @status, @duration_ms, @error, @timestamp)`
  );

  const insertCheck = db.prepare(
    `INSERT INTO checks (request_id, name, passes) VALUES (@request_id, @name, @passes)`
  );

  // This map tracks the last request ID for each virtual user to correctly associate checks.
  const vuLastRequestMap = new Map();

  const fileStream = fs.createReadStream(RESULTS_FILE);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  console.log(`Processing metric events from '${RESULTS_FILE}'...`);

  // Use a transaction for massive performance improvement when inserting many rows
  const ingest = db.transaction((metrics) => {
    for (const metric of metrics) {
      if (metric.type !== "Point") continue;

      if (metric.metric === "http_req_duration") {
        const result = insertRequest.run({
          test_run_id: testRunId,
          vu_id: metric.data.tags.vu ?? null,
          iteration: metric.data.tags.iter ?? null,
          method: metric.data.tags.method ?? null,
          url: metric.data.tags.url ?? null,
          status: metric.data.tags.status ?? null,
          duration_ms: metric.data.value,
          error: metric.data.tags.error ?? null,
          timestamp: metric.data.time,
        });

        // Keep track of the last request ID per VU
        if (metric.data.tags.vu) {
          vuLastRequestMap.set(metric.data.tags.vu, result.lastInsertRowid);
        }
      }

      if (metric.metric === "checks") {
        const vuId = metric.data.tags.vu;
        // If a check appears before its request (unlikely but possible), it has no VU and we can't associate it.
        if (vuId === undefined) continue;

        const lastRequestId = vuLastRequestMap.get(vuId);
        if (lastRequestId) {
          insertCheck.run({
            request_id: lastRequestId,
            name: metric.data.tags.check,
            passes: metric.data.value === 1,
          });
        }
      }
    }
  });

  let linesBuffer = [];
  const BATCH_SIZE = 5000;

  for await (const line of rl) {
    if (line.trim()) {
      try {
        linesBuffer.push(JSON.parse(line));
        if (linesBuffer.length >= BATCH_SIZE) {
          ingest(linesBuffer);
          linesBuffer = [];
        }
      } catch (e) {
        console.warn("Could not parse line, skipping:", line, e);
      }
    }
  }

  if (linesBuffer.length > 0) {
    ingest(linesBuffer);
  }

  // Finalize the test run with an end time
  db.prepare("UPDATE test_runs SET end_time = ? WHERE id = ?").run(
    new Date().toISOString(),
    testRunId
  );

  console.log(
    "✅ Successfully ingested all detailed results into the database."
  );
  db.close();
}

processResults().catch(console.error);
