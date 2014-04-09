var request = require('request');
var Url = require('url');

var APP_ID = "52b8025a";
var APP_KEY = "d5929f45ba3383b8cfcf6bb1bca70da4";

var getMetadata = function (options) {
  var options = options || {};
  var query = options.query || '*';
  var start = options.query || '0';
  var rows = options.rows || '0';

  var url = Url.format({
    protocol: "https",
    hostname: "apis.berkeley.edu",
    pathname: "/solr/fsm/select",
    query: {
      q: query,
      start: start,
      rows: rows,
      wt: "json",
      indent: "on",
      app_id: APP_ID,
      app_key: APP_KEY,
    },
  });

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the api content
    }
  });
};

getMetadata();
