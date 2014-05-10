'use strict';

var expect = require('chai').expect;
var validate = require('../../lib/validate/styles.js');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

describe('styles', function() {
  describe('findMedia()', function () {
    it('should return true when media found', function (done) {
      jsdom.env('<html><head><style></style></head><body><style>@media {}</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var media = validate.findMedia(window.$);
          expect(media).to.equal(true);
          done();
        }
      });
    });
    it('should return false when media not found', function (done) {
      jsdom.env('<html><head><style></style></head><body><style>body { color: black; }</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var media = validate.findMedia(window.$);
          expect(media).to.equal(false);
          done();
        }
      });
    });
  });
  describe('parseStyles()', function () {
    it('should handle base case', function() {
      var styles = ['letter-spacing', 'font-weight'];
      var parsed = validate.parseStyles(styles);
      expect(parsed).to.deep.equal([
        {name: 'letter-spacing', selector: 'letter-spacing:'},
        {name: 'font-weight', selector: 'font-weight:'}
      ]);
    });
    it('should detect CSS3', function() {
      var styles = ['letter-spacing', 'text-overflow CSS3'];
      var parsed = validate.parseStyles(styles);
      expect(parsed).to.deep.equal([
        {name: 'letter-spacing', selector: 'letter-spacing:'},
        {name: 'text-overflow CSS3', selector: 'text-overflow:'}
      ]);
    });
    it('should detect special case', function() {
      var styles = ['RGBA Colors CSS3', 'text-overflow CSS3'];
      var parsed = validate.parseStyles(styles);
      expect(parsed).to.deep.equal([
        {name: 'RGBA Colors CSS3', selector: 'rgba('},
        {name: 'text-overflow CSS3', selector: 'text-overflow:'}
      ]);
    });
  });
  describe('findInStyle()', function () {
    it('should return all styles found', function (done) {
      jsdom.env('<html><head><style>body { color: black; background: red; }</style></head><body><style>p { font-size: 12px; }</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var styles = [
            {name: 'color', selector: 'color'},
            {name: 'div', selector: 'div'}
          ];
          var result = validate.findInStyle(window, styles);
          expect(result).to.deep.equal(['color']);
          done();
        }
      });
    });
  });
  describe('findInline()', function () {
    it('should return all styles found', function (done) {
      jsdom.env('<html><head><style>body { color: black; }</style></head><body><div style="background: red"></div><style>p { font-size: 12px; }</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var styles = [
            {name: 'color', selector: 'color'},
            {name: 'background', selector: 'background'}
          ];
          var result = validate.findInline(window, styles);
          expect(result).to.deep.equal(['background']);
          done();
        }
      });
    });
  });
  describe('validate()', function () {
    it('should return all styles found', function (done) {
      jsdom.env('<html><head><style>body { color: black; }</style></head><body><div style="background: red"></div><style>p { font-size: 12px; }</style></body></html>', {
        src: [jquery],
        done: function (errors, window) {
          var styles = ['color', 'background'];
          var result = validate.validate(window, styles);
          expect(result).to.deep.equal(['background', 'color']);
          done();
        }
      });
    });
  });
});