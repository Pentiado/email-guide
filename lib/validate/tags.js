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
  return result.length ? result : null;
}

// <link> in <head>
function findInTag ($, inTags) {
  var result = [];
  var i = inTags.length;
  while (i--) {
    var tags = _extractTags(inTags[i]);
    var found = $(tags[1] + ' ' + tags[0]).length;
    if (found) { result.push(inTags[i]); }
  }
  return result.length ? result : null;
}

module.exports = {
  findInTag: findInTag,
  findRawTags: findRawTags
};
