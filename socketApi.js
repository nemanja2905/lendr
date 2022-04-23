var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
  console.log('A user connected');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  };
});

io.on('connect_failed', (socket) => {
  console.log('The connection failed');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
});

io.on('disconnect', (socket) => {
  console.log('The connection disconnected');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
});

io.on('reconnect', (socket) => {
  console.log('Connected once again');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
})

io.on('connecting', (socket) => {
  console.log('Connecting to the server');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
});

io.on('reconnecting', (socket) => {
  console.log('Re-eastablishing a connection');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
});

io.on('reconnect_fails', socket => {
  console.log('Reconnection failed');

  socketApi.sendUpdates = (type, data) => {
    io.sockets.emit(type, data);
  }
});

module.exports = socketApi;
