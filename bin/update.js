'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('../node_modules/jquery/dist/jquery.js', 'utf-8');
var http = require('http');
var unzip = require('unzip');
var excel = require('excel');
var parser = require('../lib/parser');

function parseToJSON () {
  excel('guide.xlsx', function (err, data) {
    var parsed = parser(data);
    fs.writeFile('../guide.json', JSON.stringify(parsed, null, 4), function (err) {
      fs.unlinkSync('./guide.xlsx');
      console.log(err || 'Done');
    });
  });
}

jsdom.env('http://www.campaignmonitor.com/css', {
  src: [jquery],
  done: function (errors, window) {
    var found = false;
    var url = window.$('.cssdownload a:contains("XLS")').attr('href');
    http.get('http:' + url, function (res) {
      res.pipe(unzip.Parse())
      .on('entry', function (entry) {
        var fileName = entry.path;
        if (!found && fileName.split('.')[1] === 'xlsx') {
          found = true;
          entry.pipe(fs.createWriteStream('guide.xlsx')).on('finish', parseToJSON);
        } else {
          entry.autodrain();
        }
      });
    });
  }
});
