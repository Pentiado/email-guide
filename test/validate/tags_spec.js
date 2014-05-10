'use strict';

var expect = require('chai').expect;
var validate = require('../../lib/validate/tags.js');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

describe('tags', function() {
  describe('findRawTags()', function () {
    it('should return [] when no html tags', function (done) {
      jsdom.env('<html><head></head><body></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var tags = validate.findRawTags(window.$, ['<canvas>']);
          expect(tags.length).to.be.not.ok;
          done();
        }
      });
    });
    it('should return names of found tags', function (done) {
      jsdom.env('<html><head></head><body><canvas></canvas></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var tags = validate.findRawTags(window.$, ['<canvas>', '<video>']);
          expect(tags).to.deep.equal(['<canvas>']);
          done();
        }
      });
    });
  });
  describe('validate()', function () {
    it('should return null when no html tags', function (done) {
      jsdom.env('<html><head></head><body></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var tags = validate.validate(window, ['<link> in <head>', '<div> in <p>']);
          expect(tags).to.be.not.ok;
          done();
        }
      });
    });
    it('should return names of found tags', function (done) {
      jsdom.env('<html><head></head><body><canvas></canvas></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var search = ['<canvas> in <body>', '<body> in <canvas>'];
          var tags = validate.validate(window, search);
          expect(tags).to.deep.equal(['<canvas> in <body>']);
          done();
        }
      });
    });
  });
});