'use strict';

var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(__dirname + '/../node_modules/jquery/dist/jquery.js', 'utf-8');

jsdom.env('http://www.campaignmonitor.com/css', {
  src: [jquery],
  done: function (errors, window) {
    if (errors) { throw errors; }
    var $ = window.$;
    var guide = {
      clients: [],
      tests: {}
    };

    // clients
    $('#clients .client').each(function (i, client) {
      var text = $(client).text().replace(' +', '');
      guide.clients.push(text);
    });

    // tests
    var currentType;
    var currentTest;
    $('#csstable tbody tr').each(function (i, tr) {
      var $tr = $(tr);
      if ($tr.hasClass('short')) {
        currentType = $tr.text();
        guide.tests[currentType] = {};
      } else {
        $tr.find('td').each(function (i, td) {
          var $td = $(td);
          var text = $td.text();
          text = text !== 'Info' ? text : $td.find('.info').data('original-title');
          if (i === 0) {
            currentTest = text;
            guide.tests[currentType][currentTest] = [];
          } else {
            guide.tests[currentType][currentTest].push(text);
          }
        });
      }
    });

    fs.writeFile('../guide.json', JSON.stringify(guide, null, 4), function (err) {
      console.log(err || 'The file was saved!');
    });
  }
});
