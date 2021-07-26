import React, { Component } from 'react';
import './Card.scss';

import socket from '../socketConfig';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.number,
      room_id: this.props.room_id
    }
  }

  showNumber() {
    let selected_card = {
      number: this.state.number,
      room_id: this.state.room_id
    }
    socket.emit('new_card', selected_card);
  }


  render() {

    const room_id = this.state.room_id

    // Parte delantera de una carta
    if(this.props.show) {
      return (
        <div className="card card-joker" onClick={this.showNumber.bind(this)}>
          <div className={`card-body ${room_id ? "card-interact" : ""}`}>
            <div className="top">
              <div>
                <div>{this.props.number}</div>
                <div className="heart">♥</div>
              </div>
            </div>
            <div className="center">
              <div>
                {this.props.number}
              </div>
            </div>
            <div className="bottom">
              <div>
                <div className="heart">♥</div>
                <div>{this.props.number}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    // Parte trasera de una carta
    else {
      return (
        <div className="card card-joker">
          <div className="card-body card-back">
          </div>
        </div>
      )
    }
    
  }
}

export default Card;