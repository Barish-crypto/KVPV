'use strict';

const path = require('node:path');

const browsers = Object.freeze(['edge', 'chrome']);

function selectedBrowsers(value = 'edge') {
  if (value === 'both') return browsers.slice();
  return browsers.includes(value) ? [value] : ['edge'];
}

function browserProfile(root, browser) {
  if (!browsers.includes(browser)) throw new Error('Unsupported browser: ' + browser);
  return path.join(root, '.kvpv-live', 'browser-profile-' + browser);
}

module.exports = { selectedBrowsers, browserProfile };
