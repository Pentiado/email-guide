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