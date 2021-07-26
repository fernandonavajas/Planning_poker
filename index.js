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
  // Cada vez que alguien se conecta enviar un mensaje por consola
  console.log('socket Connected: ', socket.id);


  // Cada vez que alguien envia un mensaje
  socket.on('message', message => {
    console.log('se envio un mensaje:', message)
    socket.to(message.to).emit('message', {
      body: message.body,
      from: socket.id.slice(5)
    })
  })


  // Cada vez que alguien crea una sala nueva
  // enviamos la id de la sala para que las futuras solicitudes
  // sean solo sobre su sala
  socket.on('new_room', socket_id => {
    
    // unir a la sala
    socket.join(socket_id);
    
    // cambiar la vista a vista sala
    io.to(socket.id).emit('redirect_to_room', socket_id)
    
    // añadir usuario nuevo a la lista de usuarios
    io.to(socket_id).emit('new_client', {
      room_id: socket_id,
      id: socket.id
    });
    
    console.log("Usuario", socket.id , "agregado a sala", socket_id )
    //console.log(socket.rooms)
  });

  // Cada vez que alguien selecciona una carta de su mano
  // enviamos un evento de carta seleccionada a la sala donde se encuentra
  socket.on('new_card', selected_card => {
    console.log(selected_card, socket.id)
    io.to(selected_card.room_id).emit('selected_card', {
      number: selected_card.number,
      user: socket.id
    });
  });


  // cada vez que alguien preciona "limpiar cartas"
  // enviamos un evento de limpiar cartas a la sala donde se encuentra
  socket.on('clear_card_data', room_id => {
    io.to(room_id).emit('clear_cards');
  });


  // cada vez que alguien preciona "mostrar cartas"
  // enviamos un evento para mostrar las cartas a la sala donde se encuentra
  socket.on('show_card_data', room_id => {
    io.to(room_id).emit('show_cards');
  });


  socket.on('disconnect', function() {
    //console.log("Desconectando de la sala: ", socket.id )
  })
})

server.listen(5000, ()=> {
  console.log("levantado en el puerto 5000")
})