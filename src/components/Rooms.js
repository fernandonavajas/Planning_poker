import React, { Component } from 'react';

import "./Rooms.scss"
import socket from '../socketConfig';


// Componente rooms
// Contiene la logica para crear salas
class Rooms extends Component {
  constructor(props) {
    super(props);
  }
  createRoom(){
    let new_room = socket.id
    socket.emit('new_room', new_room);
  }

  joinRoom(){
    let new_room = document.getElementById('suscribe_room').value
    socket.emit('new_room', new_room);
  }

  render() {
    return (
      <div className="Rooms">
        <button type="button" className="btn btn-dark btn-lg btn-create-room"
          onClick={this.createRoom.bind()}>Crear Sala</button>
        <br/>
        O
        <br/>
        <br/>
        <div className="d-flex">
          <input id="suscribe_room" className="input-join-room input-lg form-control"
            type="text" autoComplete="off"
            placeholder="Ingresa el ID de la sala"
          />

          <button type="button" className="btn btn-primary btn-join-room"
            onClick={this.joinRoom.bind()} >Unirse</button>
        </div>
      </div>
    );
  }
}

export default Rooms;
