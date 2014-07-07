/*global module, require*/
var io = require('socket.io-client'),
  util = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger = require('../logger.js'),
  globalCount = 0;
  
/**
 * SocketIOWorker Worker class inherits form BaseWorker
 */
var SocketIOWorker = function (server, generator) {
  SocketIOWorker.super_.apply(this, arguments);
};

util.inherits(SocketIOWorker, BaseWorker);

SocketIOWorker.prototype.createClient = function (callback) {
  var self = this;
  globalCount += 1;
  var cCount = globalCount;
  var myConn = "conn_" + cCount;
  io.Manager(this.server,{timeout:"43200000"});
  var client = io.connect(this.server, { 
    'force new connection' : true,
    'connect timeout':43200000,
    'reconnection delay': 300,
    'max reconnection attempts': 10000,
  });

  client.on('connect', function () {
    logger.error('connect success: ' + myConn);
    callback(false, client);
  });
  client.on('play', function () {
    //logger.error('connect callback');
    //logger.error("got play to: " + myConn);
  });

  client.on('connect_failed', function (err) {
    logger.error("connection failed");
    if (self.verbose) {
      logger.error("SocketIO Worker connect_failed" + JSON.stringify(err));
    }
    callback(true, client);
  });

  client.on('error', function (err) {
    if (self.verbose) {
      logger.error("SocketIO Worker error: " + JSON.stringify(err));
    }
    client.disconnect();
    //callback(true, client);
  });
  client.on('reconnect_attempt', function (err) {
    if (self.verbose) {
      logger.error("SocketIO REConnect Attempt Event: " + JSON.stringify(err));
    }
    callback(true, client);
  });
  client.on('reconnect_failed', function (err) {
    if (self.verbose) {
      logger.error("SocketIO REConnect Failed Event: " + JSON.stringify(err));
    }
    callback(true, client);
  });
};

module.exports = SocketIOWorker;
