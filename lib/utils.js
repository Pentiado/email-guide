'use strict';

module.exports = {
  filterEmpty: function (data) {
    return data.filter(function (elem) {
      return (!!elem || elem === false);
    });
  },
  pluckCSSRules: function (window, rule) {
    var result = [];
    var css = window.document.styleSheets;
    var i = css.length;
    while (i--) {
      var j = css[i].cssRules.length;
      while (j--) {
        result.push(css[i].cssRules[j][rule]);
      }
    }
    return result;
  }
};