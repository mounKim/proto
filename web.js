#!/usr/bin/env node

var express = require('express');
var app = require('./app');
var path = require('path');
var debug = require('debug')('proto:server');
var http = require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/result');
var bodyParser = require('body-parser');
var port = normalizePort(8001);

app.set('port', port);
app.set('view engine', 'pug');
app.use(express.json());
app.use('/', indexRouter);
app.use('/result', usersRouter);
app.use(bodyParser.urlencoded( {extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
