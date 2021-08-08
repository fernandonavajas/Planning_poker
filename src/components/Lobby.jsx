import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

import "./Lobby.scss"
import socket from '../socketConfig';


export class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: null
    }
  }

  componentDidMount() {
    socket.on('redirect_to_room', id => {
      this.setState({
        room_id: id
      });
    })
  }

  createRoom() {
    let new_room = socket.id
    socket.emit('new_room', new_room);
  }
  
  joinRoom() {
    let new_room = document.getElementById('suscribe_room').value
    socket.emit('new_room', new_room);
  }

  render() {

    let room_id = this.state.room_id
    if (room_id) {
      return ( <Redirect to ={"/room/"+room_id} /> )
    }
    return (
      <div className="Lobby">
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
    )
  }
}

export default Lobby;
