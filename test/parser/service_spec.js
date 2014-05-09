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

  describe.skip('combineValues()', function () {
    it('should return combined values', function () {
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
      var result = service.combineValues(platforms, clientsGroups, groups);
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
});