'use strict';

var expect = require('chai').expect;
var parser = require('../../lib/parser');
var groups = require('../fixtures/parser_fixture.json');

describe('parser', function() {
  it('should return expected json', function() {
    var result = parser(groups);
    expect(result).to.include.keys('Responsive', 'Link Element', 'Tables');
    expect(result['Positioning & Display']).to.include.keys('bottom', 'clear');
  });
});