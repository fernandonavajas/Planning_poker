import React from 'react'

import "./Lobby.scss"
import socket from '../socketConfig';


let createRoom = () => {
  let new_room = socket.id
  socket.emit('new_room', new_room);
}

let joinRoom = () => {
  let new_room = document.getElementById('suscribe_room').value
  socket.emit('new_room', new_room);
}

const Lobby = () => {
  return (
    <div className="Lobby">
      <button type="button" className="btn btn-dark btn-lg btn-create-room"
        onClick={createRoom.bind()}>Crear Sala</button>
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
          onClick={joinRoom.bind()} >Unirse</button>
      </div>
    </div>
  )
}

export default Lobby
