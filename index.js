var request = require('request');

request('https://apis.berkeley.edu/solr/fsm/select?q=*&wt=json&indent=on&app_id=52b8025a&app_key=d5929f45ba3383b8cfcf6bb1bca70da4', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the api content
  }
})