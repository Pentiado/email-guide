'use strict';

var _ = require('lodash');

function getAllSelectors (window) {
  console.log('window.document.styleSheets', window.document.styleSheets);
  var allRules = _.pluck(window.document.styleSheets, 'cssRules');
  var selectors = _.pluck(allRules, 'selectorText').join(' ,').split(' ,');
  return _.unique(selectors);
}

function parseSelectors (selectors) {
  return selectors.map(function (selector) {
    var validator = selector
      .replace(/\"/g, '') // not sure why there is an escape in provided selectors
      .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // pure magic, escape for regex
      .replace(/[EF]/g, '\S?') // optional non while space, especially for F case
      .replace(/\((s|n)\)/g, '\(.*\)') // there might be an number or something else
      .replace(/(foo|bar|id|classname)/g, '[A-Za-z0-9]*(-?[A-Za-z0-9]+)'); // any cssy words
    return {
      name: selector,
      validator: new RegExp(validator)
    };
  });
}

function findSelectors (window, selectors) {
  var result = [];
  var allSelectors = getAllSelectors(window);
  parseSelectors(selectors);

  var i = allSelectors.length;
  while (i--) {
    var j = selectors.length;
    while (j--) {
      if (allSelectors[i].match(selectors[j].validator)) {
        result.push(selectors[j].name);
        selectors.splice(j, 1);
      }
    }
  }
  return result;
}

module.exports = {
  findSelectors: findSelectors,
  getAllSelectors: getAllSelectors,
  parseSelectors: parseSelectors
};
