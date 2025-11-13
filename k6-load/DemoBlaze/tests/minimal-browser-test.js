import { check } from 'k6';

// Try to import browser from different possible locations
let browserModule;
try {
  browserModule = require('k6/browser');
  console.log('Successfully imported k6/browser');
} catch (e) {
  console.log('Error importing k6/browser:', e.message);
}

try {
  browserModule = require('k6/experimental/browser');
  console.log('Successfully imported k6/experimental/browser');
} catch (e) {
  console.log('Error importing k6/experimental/browser:', e.message);
}

export default function() {
  console.log('Available browser functions:', Object.keys(browserModule || {}).join(', '));
  
  // Log browser capabilities
  if (browserModule && browserModule.browser) {
    console.log('Browser object exists');
  } else {
    console.log('Browser object not available');
  }
  
  return;
}