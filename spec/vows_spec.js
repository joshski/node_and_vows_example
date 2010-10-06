var vows = require('vows'),
    assert = require('assert');

vows.describe('Vows specifications').addBatch({
  
  'are organised in batches': {
    
    'the thing under test is called a topic': {

      topic: function() {
        return 123;
      },

      'topics are separate from assertions': function (topic) {
        assert.equal(topic, 123);
      },
      
      'nested contexts': {
        
        topic: function(parent) {
          assert.equal(parent, 123);
          return 456;
        },
        
        'receive the parent topic': function(topic) {
          assert.equal(topic, 456);
        }
        
      },
      
      'asynchronous tests': {
        
        topic: function() {
          var callback = this.callback;
          setTimeout(function() {
            callback(null, 666, 999);
          }, 100);
        },
        
        'need separation of topic and assertions': function(err, foo, bar) {
          assert.equal(foo, 666);
          assert.equal(bar, 999);
        }
        
      }

    } 
  }
  
}).run();

