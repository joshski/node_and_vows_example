var vows = require('vows'),
    assert = require('assert'),
    server = require('../server').server;

function get(path, callback) {
  var http = require('http');
  var client = http.createClient(8124, '127.0.0.1');
  var request = client.request('GET', '/', {'host': 'localhost'});
  request.end();
  request.on('response', function (response) {
    response.status = response.statusCode;
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      response.body = chunk;
      callback(null, response);
      server.close();
    });
  });
}

vows.describe('server').addBatch({

  'responding to GET /' : {

    topic: function() {
      get('/', this.callback);
    },

    'responds 200 success' : function(err, response) {
      assert.equal(response.status, 200);
    },

    'responds with body Hello World' : function(err, response) {
      assert.equal(response.body, 'Hello World');
    },

    'responds with Content-Type header text/plain' : function(err, response) {
      assert.equal(response.headers["content-type"], 'text/plain');
    }

  }

}).run();  
