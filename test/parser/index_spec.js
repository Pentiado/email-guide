'use strict';

var expect = require('chai').expect;
var parser = require('../../lib/parser');
var groups = require('../fixtures/parser_fixture.json');

describe('parser', function() {
  it('should return expected json', function() {
    var result = parser(groups);
    expect(result).to.include.keys('clients', 'tests');
    expect(result.clients).to.be.an('array');
    expect(result.tests).to.include.keys('Responsive', 'Link Element', 'Tables');
    expect(result.tests['Positioning & Display']).to.include.keys('bottom', 'clear');
  });
});