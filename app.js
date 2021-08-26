const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

//webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

// firebase
const { db } = require('./firebase');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//middleware
app.use(webpackDevMiddleware(webpack(config)));

// app.use(express.static(path.join(__dirname,'/public')))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

io.on('connection', socket => {
  // Cada vez que alguien se conecta enviar un mensaje por consola


  // Crear nueva sala y redireccionar
  socket.on('new_room', socket_id => {
    io.to(socket.id).emit('redirect_to_room', socket_id)
  });

  // Ingreso a sala
  socket.on('new_user', socket_id => {
    socket.join(socket_id);

    //ingresarlo a la BD
    db.ref('rooms/' + socket_id).push({
      user_socket_id: socket.id,
    });

    db.ref('rooms/' + socket_id)
      .get().then((snapshot) => {
      const data = snapshot.val();
      var user_list = []
      for(var i in data){
        user_list.push(data[i].user_socket_id);
      }
      // añadir usuario nuevo a la lista de usuarios
      io.to(socket_id).emit('add_user_to_room', {
        user_list: user_list,
      });
    });
  });

  // Cada vez que alguien selecciona una carta de su mano
  // enviamos un evento de carta seleccionada a la sala donde se encuentra
  socket.on('new_card', selected_card => {
    console.log(selected_card)
    io.to(selected_card.room_id).emit('selected_card', {
      number: selected_card.number,
      user: selected_card.username,
      socket_id: socket.id
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

server.listen(8080, ()=> {
  console.log("levantado en el puerto 8080")
})