'use strict';

var utils = require('../utils.js');

function getClients (data) {
  var result = [];
  var currentPlatform = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i]) { currentPlatform.push(data[i]); }
    if (!data[i] || i === data.length - 1) {
      if (currentPlatform.length > 1) { result.push(currentPlatform); }
      currentPlatform = [];
    }
  }
  return result;
}

function getTests (data) {
  var result = {};
  var currentKey;
  for (var i = 0; i < data.length; i++) {
    var filtered = utils.filterEmpty(data[i]);
    if (filtered.length === 1) {
      currentKey = data[i][0];
      result[currentKey] = {};
    } else {
      var key = filtered.shift();
      result[currentKey][key] = filtered;
    }
  }
  return result;
}

function mergePlatformClients (platforms, clientsGroups) {
  var result = [];
  // iterate over clients groups
  for (var i = 0; i < clientsGroups.length; i++) {
    // iterate over clients
    for (var j = 0; j < clientsGroups[i].length; j++) {
      result.push({
        platform: platforms[i],
        client: clientsGroups[i][j]
      });
    }
  }
  return result;
}

module.exports = {
  getTests: getTests,
  getClients: getClients,
  mergePlatformClients: mergePlatformClients
};