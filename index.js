const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

//webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config')


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//middleware
app.use(webpackDevMiddleware(webpack(config)));

app.use(express.static(path.join(__dirname,'/public')))

io.on('connection', socket => {
  console.log('socket Connected: ', socket.id);

  socket.on('message', body => {
    console.log('se envio un mensaje:', {body})
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(5)
    })
  })

  socket.on('new_room', socket_id => {
    socket.join(socket_id);
    io.to(socket_id).emit('new_client');
    console.log("Usuario", socket.id , "agregado a sala", socket_id )
    console.log(socket.rooms)


  });
})

server.listen(5000, ()=> {
  console.log("levantado en el puerto 5000")
})