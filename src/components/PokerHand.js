import React, { Component } from 'react';

import socket from '../socketConfig';
import Card from './Card';

import './PokerHand.scss'

// Componente PokerHand
// Muestra las cartas en la mano de cada uno
class PokerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room_id: this.props.room_id,
    }
  }

  render() {
    let cards = [];
    for (let i = 0.5; i < 10; i = i + 0.5) {
      cards.push(
        <Card number={i} show={true} room_id={this.state.room_id} />
      );
    }

    return (
      <div className="PokerHand">
          {cards}
      </div>
    );
  }
}

export default PokerHand;
