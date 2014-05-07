'use strict';

module.exports = {
  filterEmpty: function (data) {
    return data.filter(function (elem) {
      return (!!elem || elem === false);
    });
  }
};