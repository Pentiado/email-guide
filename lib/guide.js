'use strict';

var guide = require('../guide.json');
var validate = require('validate');

function validateEmail (email, cb) {
  validate(email, guide, cb);
}

module.exports = {
  validateEmail: validateEmail
};