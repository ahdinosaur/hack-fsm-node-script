var request = require('request');
var Url = require('url');

var APP_ID = "52b8025a";
var APP_KEY = "d5929f45ba3383b8cfcf6bb1bca70da4";

var getMetadata = function (options, callback) {
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

  request(url, callback);
};

var handleErrors = function (callback) {
  return function (error, response, body) {
    if (error) { throw error; }
    if (response.statusCode !== 200) {
      throw new Error("status code not OK:", response.statusCode);
    }
    // call callback async
    process.nextTick(function () { callback(body); });
  };
};

getMetadata({}, handleErrors(function (body) {
  body = JSON.parse(body);
  
  var options = {
    rows: body.response.numFound,
  };

  getMetadata(options, handleErrors(function (body) {
    //body = JSON.parse(body);

    console.log(body) // Print the api content
  }));
}));
