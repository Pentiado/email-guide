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
      jsdom.env(html, {
        src: [jquery],
        done: function (errors, window) {
          var selectors = validate.getAllSelectors(window);
          expect(selectors).to.deep.equal(['div', 'body', 'a']);
          done();
        }
      });
    });
  });
  describe('parseMatchingSelectors()', function () {
    it('should return list of all unique selectors', function () {
      var selectors = [
        'E[foo~="bar"]',
        'E[foo]',
        '*',
        'E',
        'E:nth-last-child(n)',
        'E::first-letter',
        'E.classname',
        'E#id',
        'E:not(s)',
        'E + F'
      ];
      var parsed = validate.parseMatchingSelectors(selectors);
      var i = selectors.length;
      while (i--) {
        var match = parsed[i].validator.test(selectors[i]);
        if (!match) {
          console.log('parsed', parsed[i]);
          console.log('selector', selectors[i]);
        }
        expect(match).to.be.ok;
      }
    });
  });
  describe('validate()', function() {
    it('should return found selectors', function(done) {
      var html = '<html><head>' +
        '<style>body { color: black; } div > a.abc { top: 10px; }</style>' +
        '</head><body>' +
        '<style>body { left: 5px; } div { bottom: 5px; }</style>' +
        '</body></html>';
      jsdom.env(html, {
        src: [jquery],
        done: function (errors, window) {
          var selectors = ['E', 'E > F', 'E.classname', 'E#id'];
          var foundSelectors = validate.validate(window, selectors);
          expect(foundSelectors).to.deep.equal(['E.classname', 'E > F', 'E']);
          done();
        }
      });
    });
  });
});