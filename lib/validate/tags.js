'use strict';

function _extractTags (str) {
  var tags = [];
  str.replace(/<([^<]*)>/g, function (a, b) {
    tags.push(b);
  });
  return tags;
}

// rawTags = [<canvas>', '<video>'....]
function findRawTags ($, rawTags) {
  var result = [];
  var i = rawTags.length;
  while (i--) {
    var tag = _extractTags(rawTags[i])[0];
    if ($(tag).length) {
      result.push(rawTags[i]);
    }
  }
  return result;
}

// <style> in <body> etc
function findInTags ($, inTags) {
  var result = [];
  var i = inTags.length;
  while (i--) {
    var tags = _extractTags(inTags[i]);
    var found = $(tags[1] + ' ' + tags[0]).length;
    if (found) { result.push(inTags[i]); }
  }
  return result;
}

// <link> in <head>
function validate (window, tests) {
  var validation = tests[0].match(' in ') ? findInTags : findRawTags;
  var result = validation(window.$, tests);
  return result.length ? result : null;
}

module.exports = {
  validate: validate,
  findRawTags: findRawTags
};
