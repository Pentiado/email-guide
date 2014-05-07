'use strict';

function _find ($, tags) {
  var result = [];
  var i = tags.length;
  while (i--) {
    if ($(tags[i].selector).length) { result.push(tags[i].name); }
  }
  return result.length ? result : null;
}

// rawTags = [<canvas>', '<video>'....]
function findRawTags ($, rawTags) {
  var tags = [];
  var i = rawTags.length;
  while (i--) {
    tags.push({
      name: rawTags[i],
      selector: rawTags[i].slice(1, -1)
    });
  }
  return _find($, tags);
}

function findStyleTags ($) {
  var tags = [
    {name: 'head', selector: 'head style'},
    {name: 'body', selector: 'body style'}
  ];
  return _find($, tags);
}

module.exports = {
  findStyleTags: findStyleTags,
  findRawTags: findRawTags
};
