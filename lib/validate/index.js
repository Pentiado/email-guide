'use strict';

var _ = require('lodash');
var validate = {
  selectors: require('./selectors.js').validate,
  styles: require('./styles.js').validate,
  tags: require('./tags.js').validate
};

function _filterEmpty (result) {
  for (var type in result) {
    if (_.isEmpty(result[type])) { delete result[type]; }
  }
  return result;
}

module.exports = function (window, tests) {
  var groupedTests = {
    selectors: _.pick(tests, [
      'selectors'
    ]),
    styles: _.pick(tests, [
      'Responsive',
      'Text & Fonts',
      'Color & Background',
      'Box Model',
      'Positioning & Display',
      'Lists',
      'Tables'
    ]),
    tags: _.pick(tests, [
      'Style element',
      'Link Element',
      'HTML 5'
    ])
  };

  var result = {};
  for (var type in groupedTests) {
    result[type] = {};
    for (var group in groupedTests[type]) {
      var testsNames = Object.keys(groupedTests[type][group]);
      var validated = validate[type](window, testsNames);
      if (validated) { result[group] = validated; }
    }
  }
  return _filterEmpty(result);
};