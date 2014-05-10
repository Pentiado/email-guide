'use strict';

var _ = require('lodash');
var utils = require('../utils.js');

function getAllSelectors (window) {
  var selectors = utils.pluckCSSRules(window, 'selectorText');
  return _.unique(selectors.join(', ').split(', '));
}

function parseMatchingSelectors (selectors) {
  return selectors.map(function (selector) {
    var validator = selector
      .replace(/\"/g, '"') // not sure why there is an escape in provided selectors
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // pure magic, escape for regex
      .replace(/[EF]/g, '\\S?') // optional non while space, especially for F case
      .replace(/\([sn]\\\)/g, '(.*\\)') // there might be an number or something else
      .replace(/(foo|bar|id|classname)/g, '[A-Za-z0-9]*(-?[A-Za-z0-9]+)'); // any cssy words
    return {
      name: selector,
      validator: new RegExp(validator)
    };
  });
}

function validate (window, tests) {
  var result = [];
  var allSelectors = getAllSelectors(window);
  var matchingSelectors = parseMatchingSelectors(tests);

  var i = allSelectors.length;
  while (i--) {
    var j = matchingSelectors.length;
    while (j--) {
      if (allSelectors[i].match(matchingSelectors[j].validator)) {
        result.push(matchingSelectors[j].name);
        matchingSelectors.splice(j, 1);
      }
    }
  }
  return result;
}

module.exports = {
  validate: validate,
  getAllSelectors: getAllSelectors,
  parseMatchingSelectors: parseMatchingSelectors
};
