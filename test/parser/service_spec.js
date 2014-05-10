'use strict';

var assert = require('assert');
var service = require('../../lib/parser/service.js');

describe('Parser', function () {
  describe('getClients()', function () {
    it('should return array of arrays separating by empty elem', function () {
      var arr = ['', 1, '', 3, 4, '', 5, 6];
      var clients = service.getClients(arr);
      assert.deepEqual([[3,4], [5,6]], clients);
    });
  });

  describe('getTests()', function () {
    it('should return grouped values', function () {
      var arr = [
        ['Responsive', '', '', ''],
        ['@media', '', '', 'Yes', 'No'],
        ['Style element', '', '', '', ''],
        ['<style> in <body>', '', '', 'Yes', 'Yes'],
        ['<style> in <head>', '', '', 'Yes', 'No']
      ];
      var expected = {
        'Responsive': {
          '@media': ['Yes', 'No']
        },
        'Style element': {
          '<style> in <body>': ['Yes', 'Yes'],
          '<style> in <head>': ['Yes', 'No']
        }
      };
      var groups = service.getTests(arr);
      assert.deepEqual(expected, groups);
    });
  });
});