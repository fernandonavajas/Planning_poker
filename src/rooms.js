import React, { Component } from 'react';

import socket from './socketConfig';

// Componente rooms
// Contiene la logica para crear salas
class Rooms extends Component {

  createRoom(){
    socket.emit('new_room', socket.id);
  }

  joinRoom(){
    socket.emit('new_room', document.getElementById('suscribe_room').value);
  }

  inviteLink() {
    alert(socket.id)
  }

  render() {
    return (
      <div className="Rooms">
        <button type="button" class="btn btn-dark"
          onClick={this.createRoom.bind()}>Crear Sala</button>
        <input id="suscribe_room"
          type="text"
          placeholder="Ingresa el ID de la sala"
        />
        <button type="button" class="btn btn-primary"
          onClick={this.joinRoom.bind()} >Unirse</button>

        <button type="button" class="btn btn-success"
          onClick={this.inviteLink.bind()} >Compartir Link</button>
      </div>
    );
  }
}

export default Rooms;
