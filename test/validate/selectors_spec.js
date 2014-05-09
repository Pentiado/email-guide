'use strict';

var expect = require('chai').expect;
var validate = require('../../lib/validate/selectors.js');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

describe('selectors', function() {
  describe('getAllSelectors()', function () {
    it('should return list of all unique selectors', function (done) {
      var html = '<html><head>' +
        '<style>body { color: black; } div, a { top: 10px; }</style>' +
        '</head><body>' +
        '<style>body { left: 5px; } div { bottom: 5px; }</style>' +
        '</body></html>';
      html = '<html><head><style>body { color: black; background: red; }</style></head><body><style>div { font-size: 12px; }</style></body></html>';
      jsdom.env(html, {
        src: [jquery],
        done: function (errors, window) {
          var selectors = validate.getAllSelectors(window);
          console.log('selectors', selectors);
          done();
        }
      });
    });
  });
});