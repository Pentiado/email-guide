'use strict';

var utils = require('./utils.js');

// // // // // // // // // // // // // //

function parse (data) {
  var platforms = utils.filterEmpty(data[0]);
  var clientsGroups = utils.getClients(data[2]);
  var groups = utils.getGroups(data.splice(3));
  return utils.combineValues(platforms, clientsGroups, groups);
}

module.exports = parse;