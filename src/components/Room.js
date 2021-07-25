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
  }

  render() {
    return (
      <div className="Room">
        <PokerPot/>
        <PokerHand/>
      </div>
    );
  }
}

export default Room;
