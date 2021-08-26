const express = require('express');
const app = express();
//creamos Servidor HTTP para las conexiones con la libreria express   
const http = require('http').Server(app);
//creamos una variable para gestionar las comunicacion usando socket.io
const io = require('socket.io')(http);
//creamos las rutas de los routes
app.use(require('./routes/stream.routes.js'));

// evento de conexion multicanal
io.on('connection', (socket) => {
  socket.on('stream', (image) => {
    //emitir el evento a los sockets conectados 
    socket.broadcast.emit('stream', image);
  })
})

app.use(express.static(__dirname + "/web"));
module.exports = http;
