'use strict';

var expect = require('chai').expect;
var utils = require('../lib/utils.js');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

describe('utils', function() {
  describe('filterEmpty()', function () {
    it('should return only truthy values', function () {
      var arr = [1, '', false];
      var filtered = utils.filterEmpty(arr);
      expect(filtered).to.deep.equal([1, false]);
    });
  });
  describe('getAllRules()', function () {
    it('should return all styles found', function (done) {
      jsdom.env('<html><head><style>body { color: black; background: red; }</style></head><body><style>div { font-size: 12px; }</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var rules = utils.pluckCSSRules(window, 'cssText');
          var expected = [
            'div {font-size: 12px;}',
            'body {color: black; background: red;}'
          ];
          expect(rules).to.deep.equal(expected);
          done();
        }
      });
    });
  });
});