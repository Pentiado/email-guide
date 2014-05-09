'use strict';

var service = require('./service.js');
var utils = require('../utils.js');

// // // // // // // // // // // // // //

function parse (data) {
  var platforms = utils.filterEmpty(data[0]);
  var clientsGroups = service.getClients(data[2]);
  var tests = service.getTests(data.splice(3));
  return {
    clients: service.mergePlatformClients(platforms, clientsGroups),
    tests: tests
  };
}

module.exports = parse;