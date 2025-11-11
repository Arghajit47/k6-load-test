# Performance Metrics Testing Suite

A comprehensive performance testing framework combining k6 load testing and Playwright end-to-end testing to measure and analyze application performance metrics.

## 🚀 Overview

This repository contains a structured collection of performance tests designed to:

- Execute load testing scenarios using k6
- Run end-to-end browser tests with Playwright
- Collect and analyze performance metrics
- Generate detailed performance reports

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [k6 Load Testing](#k6-load-testing)
  - [Playwright Testing](#playwright-testing)
- [Test Scenarios](#test-scenarios)
- [Reports](#reports)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **k6 Load Testing**
  - Custom metrics implementation (Trends, Counters, Rates, Gauges)
  - Multiple test scenarios (smoke, load, stress, spike, soak)
  - Threshold validation
  - Performance checks and assertions
  - Groups and tags for test organization

- **Playwright Testing**
  - End-to-end browser automation
  - Performance metrics collection
  - Visual regression testing capabilities
  - Cross-browser support

- **Reporting**
  - Pulse dashboard integration for visual reports
  - Performance metrics visualization
  - JSON and HTML report formats

## 🛠 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- k6 (for load testing)

### Installing k6

**macOS:**

```bash
brew install k6
```

**Windows:**

```bash
choco install k6
```

**Linux:**

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

## 📦 Installation

A. Clone the repository:

```bash
git clone https://github.com/yourusername/performance-metrics.git
cd performance-metrics
```

B. Install dependencies:

```bash
npm install
```

C. Install Playwright browsers:

```bash
npx playwright install
```

## 📁 Project Structure

performance-metrics/
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── k6-load/              # k6 load testing scripts
│   ├── Day1/             # Basic smoke to load tests
│   ├── Day2/             # HTTP request methods
│   ├── Day3/             # Checks implementation
│   ├── Day4/             # Thresholds configuration
│   ├── Day5/             # Combined features
│   ├── Day6-7/           # Test types (smoke, soak, spike)
│   ├── Day8/             # Ramping patterns
│   ├── Day9/             # Grouping
│   ├── Day10/            # Groups and tags
│   └── Day11/            # Custom metrics
├── tests/                # Playwright test files
├── tests-examples/       # Example test scenarios
├── db.js                 # Database utilities
├── package.json          # Project dependencies
├── playwright.config.js  # Playwright configuration
└── README.md            # This file

## 🔧 Usage

### k6 Load Testing

Run k6 tests from the `k6-load` directory:

```bash
# Run a basic smoke test
k6 run k6-load/Day1/smoke-to-small-load.js

# Run with custom VUs and duration
k6 run --vus 10 --duration 30s k6-load/Day3/checks.js

# Run with custom metrics
k6 run k6-load/Day11/custom-trends.js

# Output results to JSON
k6 run --out json=results.json k6-load/Day4/thresholds.js
```

### Playwright Testing

Run Playwright tests:

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/example.spec.js

# Run tests in headed mode
npx playwright test --headed

# Run tests with UI mode
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

## 📊 Test Scenarios

### k6 Test Types

1. **Smoke Tests** - Minimal load to verify system functionality
2. **Load Tests** - Normal expected load
3. **Stress Tests** - Beyond normal capacity
4. **Spike Tests** - Sudden traffic increases
5. **Soak Tests** - Extended duration tests

### Custom Metrics Available

- **login_duration** - Tracks response time for authentication
- **total_requests** - Counts all HTTP requests
- **success_rate** - Monitors request success ratio
- **response_size** - Measures response payload size

### Example Thresholds

```javascript
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
    login_duration: ['p(95)<1000'],
    success_rate: ['rate>0.95'],
  },
};
```

## 📈 Reports

### k6 Reports

- Console output with real-time metrics
- JSON export for further analysis
- Integration with Grafana/InfluxDB (optional)

### Playwright Reports

- HTML reports with screenshots
- JSON results for CI integration
- Performance metrics dashboard via Pulse

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow JavaScript Standard Style
- Add appropriate comments for complex logic
- Update documentation for new features
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [k6.io](https://k6.io/) for the excellent load testing tool
- [Playwright](https://playwright.dev/) for browser automation
- [HTTPbin](https://httpbin.org/) for test endpoints

## 📞 Support

For issues, questions, or contributions, please:

- Open an issue in the GitHub repository
- Check existing documentation and examples
- Review the test reports in each Day's folder

---

Happy Performance Testing! 
