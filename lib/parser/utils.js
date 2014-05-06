'use strict';
var _ = require('lodash');

function filterEmpty (data) {
  return data.filter(function (elem) {
    return (!!elem || elem === false);
  });
}

function toBoolean (data) {
  var i = data.length;
  while (i--) {
    // just for safety toLowerCase
    var value = String(data[i]).toLowerCase();
    data[i] = (value === 'yes' ? true : false);
  }
  return data;
}

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

function getGroups (data) {
  var result = {};
  var currentKey;
  for (var i = 0; i < data.length; i++) {
    var filtered = filterEmpty(data[i]);
    if (filtered.length === 1) {
      currentKey = data[i][0];
      result[currentKey] = {};
    } else {
      var key = filtered.shift();
      result[currentKey][key] = toBoolean(filtered);
    }
  }
  return result;
}

function _mergePlatformClients (platforms, clientsGroups) {
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

function _clientsApproved (values, clients) {
  var result = [];
  for (var i = 0; i < values.length; i++) {
    var approved = _.extend({approved: values[i]}, clients[i]);
    result.push(approved);
  }
  return result;
}

function combineValues (platforms, clientsGroups, groups) {
  var result = {};
  var clients = _mergePlatformClients(platforms, clientsGroups);
  for (var type in groups) {
    result[type] = {};
    for (var group in groups[type]) {
      var combined = _clientsApproved(groups[type][group], clients);
      result[type][group] = combined;
    }
  }
  return result;
}

module.exports = {
  getGroups: getGroups,
  getClients: getClients,
  toBoolean: toBoolean,
  filterEmpty: filterEmpty,
  combineValues: combineValues
};