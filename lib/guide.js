'use strict';

var guide = require('../guide.json');
var jsdom = require('jsdom');
var validate = require('./validate');
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/../node_modules/jquery/dist/jquery.js', 'utf-8');
var _ = require('lodash');

// results = {
//  'Responsive': ['@media'],
//  'Style Element': ['<style> in <head>']
// }
function _prepareResults (results) {
  var prepared = {
    clients: guide.clients,
    tests: {}
  };
  // for Responsive, Style Element in...
  for (var group in results) {
    prepared.tests[group] = _.pick(guide.tests[group], results[group]);
  }
  return prepared;
}

module.exports = function validateEmail (email, cb) {
  jsdom.env(email, {
    src: [jquery],
    done: function (err, window) {
      if (err) { return cb(err); }
      var results = validate(window, guide.tests);
      cb(null, _prepareResults(results));
    }
  });
};