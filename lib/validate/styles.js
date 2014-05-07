'use strict';

var util = require('../util.js');

function findMedia ($) {
  return !!$('style').text().match(/@media/);
}

function _dashToCamel (word) {
  return word.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

function findTables (window, styles) {
  styles = styles.map(function (styl) {
    return _dashToCamel(styl);
  });
  var result = [];
  var tagsStyles = util.filterEmpty(_.pluck(window.$('body *'), 'style'));
  var i = tagsStyles.length;
  while (i--) {
    var match = _.intersection(tagsStyles[i], styles);
    result = result.concat(match);
  }
  return result;
}

module.exports = {
  findTables: findTables,
  findMedia: findMedia
};