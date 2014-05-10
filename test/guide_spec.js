'use strict';

var expect = require('chai').expect;
var validate = require('../lib/guide.js');
var fs = require('fs');
var email = fs.readFileSync('test/fixtures/email.html', 'utf-8');

describe('guide', function () {
  it('should return validated email', function (done) {
    validate(email, function (err, result) {
      expect(err).to.be.not.ok;
      expect(result).to.include.keys('clients', 'tests');
      expect(result.clients).to.be.an('array');
      expect(result.tests).to.include.keys('Text & Fonts', 'Color & Background', 'Box Model', 'Style Element');
      expect(result.tests['Text & Fonts']['text-decoration']).to.be.an('array');
      done();
    });
  });
});