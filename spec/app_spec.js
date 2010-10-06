var vows = require('vows'),
    assert = require('assert'),
    app = require('../app');

function get(path, callback) {
  var request = {}
  var response = {
    writeHead : function(status, headers) {
      this.status = status;
      this.headers = headers;
    },
    status: "<none>",
    headers: {},
    end: function(body) {
      this.body = body;
      callback(null, this);
    }
  }
  app.respond(request, response);
}

vows.describe('App').addBatch({
  
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
      assert.equal(response.headers["Content-Type"], 'text/plain');
    }
    
  }
  
}).run();