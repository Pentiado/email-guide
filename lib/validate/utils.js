'use strict';

var _ = require('lodash');

////////////////
// Responsive //
////////////////
function findMedia ($) {
  return !!$('style').text().match(/@media/);
}

///////////////////
// Style element //
///////////////////
function findStyleInHead ($) {
  return !!$('head style').length;
}

function findStyleInBody ($) {
  return !!$('body style').length;
}

//////////////////
// Link Element //
//////////////////
function findLinkInHead ($) {
  return !!$('head link').length;
}

///////////////
// Selectors //
///////////////
function _getAllSelectors (window) {
  var allRules = _.pluck(window.document.styleSheets, 'cssRules');
  return _.pluck(allRules, 'selectorText');
}

function matchSelector (match, selector) {
  // a = word containing a-z and -
  // b = any single word
  // c = anything
  if (match === '*') {
    selector.match(/\*/);
  } else if (match === 'E') {
    // a
  } else {
    // E[foo]
    // find [a]
    // E[foo=\"bar\"]
    // find [a=c]
    // E:nth-child(n)
    // find nth-child
    // E#id
    // find #b
    // E:not(s)
    // find :not
    // E F
    // find 'c c'
    // E > F
    // find 'c > c'
  }
}

function selectors (window, selectors) {
  var allSelectors = _getAllSelectors(window);
  var found = [];
  for (var i = 0; i < allSelectors.length; i++) {
    var j = selectors.length;
    while (j--) {
      if (matchSelector(selectors[j], allSelectors[i])) {
        found.push(selectors[j]);
        selectors.splice(j, 1);
      }
    }
  }
}

////////////
// Tables //
////////////

function filterEmpty (data) {
  return data.filter(function (elem) {
    return (!!elem || elem === false);
  });
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
  var tagsStyles = filterEmpty(_.pluck(window.$('body *'), 'style'));
  var i = tagsStyles.length;
  while (i--) {
    var match = _.intersection(tagsStyles[i], styles);
    result = result.concat(match);
  }
  return result;
}

////////////
// HTML 5 //
////////////

function findHTML5 (window, tags) {
  var result = [];
  var i = tags.length;
  while (i--) {
    var tag = tags[i].slice(1, -1);
    if (window.$(tag).length) {
      result.push(tags[i]);
    }
  }
  return result;
}



module.exports = {
  findMedia: findMedia,
  findStyleInHead: findStyleInHead
};