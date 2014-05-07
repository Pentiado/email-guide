'use strict';

function findLinkInHead ($) {
  return !!$('head link').length;
}


module.exports = {
  findMedia: findMedia,
  findStyleInHead: findStyleInHead
};