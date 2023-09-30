#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('proto:server');
var http = require('http');
var ExcelJS = require('exceljs');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(8001);
app.set('port', port);

app.get('/', (req, res) => {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile('./sample.xlsx')
    .then(() => {
      const worksheet = workbook.getWorksheet(1);

      const data = [];
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        data.push(row.values);
      });
      res.json(data);
    })
    .catch(err => {
      console.error('Excel 파일을 읽는 동안 오류 발생:', err);
      res.status(500).send('서버 오류');
    });
});
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

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
