'use strict';

var service = require('./service.js');
var utils = require('../utils.js');

// // // // // // // // // // // // // //

function parse (data) {
  var platforms = utils.filterEmpty(data[0]);
  var clientsGroups = service.getClients(data[2]);
  var groups = service.getGroups(data.splice(3));
  return service.combineValues(platforms, clientsGroups, groups);
}

module.exports = parse;