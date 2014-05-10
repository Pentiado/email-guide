'use strict';

var expect = require('chai').expect;
var validate = require('../../lib/validate/index.js');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

describe('validate()', function () {
  it('should return validated email', function (done) {
    var html = '<html><head>' +
      '<style>body { color: black; } div, a { top: 10px; }</style>' +
      '</head><body>' +
      '<style>body { left: 5px; } div { bottom: 5px; }</style>' +
      '<canvas></canvas></body></html>';
    jsdom.env(html, {
      src: [jquery],
      done: function (errors, window) {
        var tests = {
          'selectors': {
            'E': [true, false]
          },
          'Responsive': {
            '@media': [true, false]
          },
          'Text & Fonts': {
            'direction': [true, false]
          },
          'Style Element': {
            '<style> in <head>': [true, false],
            '<style> in <body>': [true, false]
          },
          'HTML 5': {
            '<canvas>': [true, false]
          }
        };
        var validated = validate(window, tests);
        expect(validated).to.deep.equal({
          'selectors': ['E'],
          'Style Element': ['<style> in <body>', '<style> in <head>'],
          'HTML 5': ['<canvas>']
        });
        done();
      }
    });
  });
});