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

    // referencias de la BD
    var refRoom = db.ref('rooms/' + socket_id)
    var refShowCards = db.ref('rooms/' + socket_id + '/showCards/')
    var refUSers = db.ref('rooms/' + socket_id + '/users/')
    var refUSer = db.ref('rooms/' + socket_id + '/users/' + socket.id)

    if (socket_id === socket.id) {
      refRoom.set({
        showCards: false
      })
    }
    //ingresarlo a la BD
    refUSer.set({
      username: socket.id,
      score_poker: -1
    });

    refUSers.get().then((snapshot) => {
      var user_list = []
      snapshot.forEach(function(data) {
        user_list.push(data);
      });
      io.to(socket_id).emit('update_user_list', user_list);
    });

    refShowCards.get().then((snapshot) => {
      if (snapshot.val()== true) {
        io.to(socket_id).emit('show_cards');
      }
    });
  });

  // Cada vez que alguien selecciona una carta de su mano
  // enviamos un evento de carta seleccionada a la sala donde se encuentra
  socket.on('new_card', selected_card => {
    var refUSer = db.ref("rooms/" + selected_card.room_id + '/users/' + socket.id);
    refUSer.update({
      username: selected_card.username,
      score_poker: selected_card.number
    });

    var refUSers = db.ref('rooms/' + selected_card.room_id + '/users')
    refUSers.get().then((snapshot) => {
      var user_list = []
      snapshot.forEach(function(data) {
        user_list.push(data);
      });
      io.to(selected_card.room_id).emit('update_user_list', user_list);
    });
  });

  // cada vez que alguien preciona "limpiar cartas"
  // enviamos un evento de limpiar cartas a la sala donde se encuentra
  socket.on('clear_card_data', room_id => {
    var refRoom = db.ref('rooms/' + room_id)
    var refUSers = db.ref('rooms/' + room_id + '/users/')

    refUSers.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        child.ref.update({
          score_poker: -1
        });
      });
    });
    refRoom.update({
      showCards: false,
    }).then(()=>{
      io.to(room_id).emit('clear_cards');
    });
  });


  // cada vez que alguien preciona "mostrar cartas"
  // enviamos un evento para mostrar las cartas a la sala donde se encuentra
  socket.on('show_card_data', room_id => {
    var refRoom = db.ref('rooms/' + room_id)
    refRoom.update({
      showCards: true,
    }).then(()=>{
      io.to(room_id).emit('show_cards');
    });
  });


  socket.on('disconnect', function() {
    //console.log("Desconectando de la sala: ", socket.id )
  })
})

server.listen(8080, ()=> {
  console.log("levantado en el puerto 8080")
})