'use strict';

var assert = require('assert');
var utils = require('../../lib/parser/utils.js');

describe('Parser', function () {
  describe('filterEmpty()', function () {
    it('should return only truthy values', function () {
      var arr = [1, '', false];
      var filtered = utils.filterEmpty(arr);
      assert.deepEqual([1, false], filtered);
    });
  });

  describe('toBoolean()', function () {
    it('should convert and return array yes/no to true false', function () {
      var arr = [1, 'Yes', 'yes', 'no'];
      var converted = utils.toBoolean(arr);
      assert.deepEqual([false, true, true, false], converted);
    });
  });

  describe('getClients()', function () {
    it('should return array of arrays separating by empty elem', function () {
      var arr = ['', 1, '', 3, 4, '', 5, 6];
      var clients = utils.getClients(arr);
      assert.deepEqual([[3,4], [5,6]], clients);
    });
  });

  describe('getGroups()', function () {
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
          '@media': [true, false]
        },
        'Style element': {
          '<style> in <body>': [true, true],
          '<style> in <head>': [true, false]
        }
      };
      var groups = utils.getGroups(arr);
      assert.deepEqual(expected, groups);
    });
  });

  describe('combineValues()', function () {
    var platforms = ['P1', 'P2'];
    var clientsGroups = [['C1', 'C2'], ['C3', 'C4']];
    var groups = {
      'Responsive': {
        '@media': [true, false, true, false]
      },
      'Style element': {
        '<style> in <body>': [true, true, true, true],
        '<style> in <head>': [true, false, false, false]
      }
    };
    var result = utils.combineValues(platforms, clientsGroups, groups);
    var expected = {
      'Responsive': {
        '@media': [
          {approved: true, client: 'C1', platform: 'P1'},
          {approved: false, client: 'C2', platform: 'P1'},
          {approved: true, client: 'C3', platform: 'P2'},
          {approved: false, client: 'C4', platform: 'P2'},
        ]
      },
      'Style element': {
        '<style> in <body>': [
          {approved: true, client: 'C1', platform: 'P1'},
          {approved: true, client: 'C2', platform: 'P1'},
          {approved: true, client: 'C3', platform: 'P2'},
          {approved: true, client: 'C4', platform: 'P2'}
        ],
        '<style> in <head>': [
          {approved: true, client: 'C1', platform: 'P1'},
          {approved: false, client: 'C2', platform: 'P1'},
          {approved: false, client: 'C3', platform: 'P2'},
          {approved: false, client: 'C4', platform: 'P2'}
        ]
      }
    };
    assert.deepEqual(expected, result);
  });
});