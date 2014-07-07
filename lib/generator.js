/*global module, require*/

var logger = require('./logger');

module.exports = {

  x: 0,
  /**
   * Before connection (just for faye)
   * @param {client} client connection
   */
  beforeConnect : function (client) {
    // Your logic
    // By example
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
  },

  /**
   * on socket io connect
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  onConnect : function (client, done) {
    // Your logic
    // client.subscribe('/test', function() {});
    //logger.error("on connect generator");
    //client.emit('join_game', {id: "TESTBENCH:1:GB-SF:global:free:0:live", uuid:"TEST_USER", auth:"5976nextplay!2265RSU" } );
    done();
  },

  /**
   * send a message
   * @param {client} client connection
   * @param {done}   callback function(err) {}
   */
  sendMessage : function (client, done) {
    //logger.error('Not implement method sendMessage in generator');
    // Your logic
    //client.emit('test', { hello: 'world' });
    //client.publish('/test', { hello: 'world' });
    client.emit('join_game', {id: "TESTBENCH:1:GB-SF:global:free:0:live", uuid:"TEST_USER_" + this.x, auth:"5976nextplay!2265RSU" } );
    done();
  }
};
