'use strict';

var excel = require('excel');
var parser = require('lib/parser');
var fs = require('fs');

// // // // // // // // // // // // // //

excel('guide.xlsx', function (err, data) {
  var parsed = parser(data);
  fs.writeFile('./guide.json', JSON.stringify(parsed, null, 4), function (err) {
    console.log(err || 'saved');
  });
});