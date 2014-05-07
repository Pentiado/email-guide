'use strict';

// var excel = require('excel');
// var parser = require('lib/parser');
// var fs = require('fs');
var _ = require('lodash');
// // // // // // // // // // // // // //

// excel('guide.xlsx', function (err, data) {
//   var parsed = parser(data);
//   fs.writeFile('./guide.json', JSON.stringify(parsed, null, 4), function (err) {
//     console.log(err || 'saved');
//   });
// });


var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');
var guide = fs.readFileSync('./guide.json', 'utf-8');

// RESPONSIVE
// @media
// find <style> and inside @media keyword

// Style element
// <style> in <head> - find

jsdom.env({
  file: 'email-blueprints/templates/2col-1-2-leftsidebar.html',
  src: [jquery],
  done: function (errors, window) {
    var $ = window.$;
    var selectors = _.pluck(window.document.styleSheets[0].cssRules, 'selectorText');
    console.log('HN Links', selectors);
    // $('style').each(function () {
    //   console.log(" -", $(this).text());
    // });
  }
});