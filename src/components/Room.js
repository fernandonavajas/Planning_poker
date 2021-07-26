import React, { Component } from 'react';

import socket from '../socketConfig';
import PokerHand from './PokerHand';
import PokerPot from './PokerPot';

import './Room.scss'
// Componente room
// Contiene la logica de una unica sala
class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room_id: this.props.room_id,
    }
  }

  render() {
    return (
      <div className="Room">
        <PokerPot room_id={this.state.room_id}/>
        <PokerHand room_id={this.state.room_id}/>
      </div>
    );
  }
}

export default Room;
