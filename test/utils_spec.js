'use strict';

var expect = require('chai').expect;
var utils = require('../lib/utils.js');

describe('utils', function() {
  describe('filterEmpty()', function () {
    it('should return only truthy values', function () {
      var arr = [1, '', false];
      var filtered = utils.filterEmpty(arr);
      expect(filtered).to.deep.equal([1, false]);
    });
  });
});