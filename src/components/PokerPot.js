import React, { Component } from 'react';

import socket from '../socketConfig';
import Card from './Card';

import './PokerPot.scss';

// Componente PokerPot
// Muestra el pozo de cartas en la mesa
class PokerPot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PokerPot">
        <span className="score-element">
          <p className="score-text">El promedio es de: 5 </p>
        </span>
        <div className="pot">
          <Card number={1} show={false}/>
          <Card number={2} show={false}/>
          <Card number={3} show={false}/>
          <Card number={4} show={false}/>
          <Card number={1} show={false}/>
          <Card number={4} show={false}/>
        </div>
      </div>
    );
  }
}

export default PokerPot;
