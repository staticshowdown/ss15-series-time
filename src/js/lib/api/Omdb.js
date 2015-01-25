var qs = require('querystring');
var Promise = require('bluebird');

var Omdb = {
  search: function Omdb__search(id, title) {
    return new Promise(function(resolve, reject){
      var fnName = 'omdb_jsonp_' + id;

      window[fnName] = function(data) {
        resolve(data);
      };

      var q = qs.stringify({
        t: title,
        type: 'series',
        plot: 'short',
        r: 'json',
        callback: fnName,
      });

      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://www.omdbapi.com/?' + q;
      document.body.appendChild(s);
    });
  }
};

module.exports = Omdb;
