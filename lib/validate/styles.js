'use strict';

var utils = require('../utils.js');
var _ = require('lodash');

function findMedia ($) {
  return !!$('style').text().match(/@media/);
}

function parseStyles (styles) {
  var specialCases = [
    {name: 'HSL Colors CSS3', selector: 'hsl('},
    {name: 'HSLA Colors CSS3', selector: 'hsla('},
    {name: 'Opacity CSS3', selector: 'opacity:'},
    {name: 'RGBA Colors CSS3', selector: 'rgba('}
  ];
  return styles.map(function (style) {
    var selector;
    var cssIndex = style.indexOf('CSS3');
    var specialCase = _.find(specialCases, function (elem) {
      return (elem.name === style);
    });
    if (!specialCase && (cssIndex !== -1)) {
      selector = style.slice(0, cssIndex - 1);
    }
    return specialCase || {name: style, selector: (selector || style) + ':'};
  });
}

function findInStyle (window, matchStyles, allStyles) {
  allStyles = allStyles || utils.pluckCSSRules(window, 'cssText');
  var result = [];
  var i = allStyles.length;
  while (i--) {
    var k = matchStyles.length;
    while (k--) {
      if (allStyles[i].indexOf(matchStyles[k].selector) !== -1) {
        result.push(matchStyles[k].name);
        matchStyles.splice(k, 1);
      }
    }
  }
  return result;
}

function findInline (window, styles) {
  var tags = window.$('body *');
  var cssText = _.pluck(_.pluck(tags, 'style'), 'cssText');
  var allStyles = utils.filterEmpty(cssText);
  return findInStyle(window, styles, allStyles);
}

function findStyles (window, styles) {
  var parsed = parseStyles(styles);
  var inStyles = findInStyle(window, parsed);
  var inline = findInline(window, parsed);

  var result = inline.concat(inStyles);
  return result.length ? result : null;
}

module.exports = {
  findStyles: findStyles,
  findInline: findInline,
  findInStyle: findInStyle,
  findMedia: findMedia,
  parseStyles: parseStyles
};