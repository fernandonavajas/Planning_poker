import React, { Component } from 'react';

import socket from '../socketConfig';
import Card from './Card';

// Componente PokerPot
// Muestra el pozo de cartas en la mesa
class PokerPot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PokerPot">
        <Card number={1} show={false}/>
        <Card number={2} show={false}/>
        <Card number={3} show={false}/>
        <Card number={4} show={false}/>
      </div>
    );
  }
}

export default PokerPot;
