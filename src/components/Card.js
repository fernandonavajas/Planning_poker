import React, { Component } from 'react';
import './Card.scss';

import socket from '../socketConfig';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.number,
    }
  }

  showNumber() {
    let selected_card = {
      number: this.state.number,
      room_id: this.props.room_id,
      username: document.getElementById('input_username_room').value || "Anónimo"
    }
    socket.emit('new_card', selected_card);
  }

  showUsername() {
    if (this.props.user) {
      return (
        <span className="username">
          {this.props.user.slice(0, 12)}
        </span>
        )
    }
    
  }

  render() {

    const room_id = this.props.room_id

    // Parte delantera de una carta
    if(this.props.show) {
      return (
        <div className="card_container">
          <div className={`card card-joker ${this.props.pokerhand ? "card-in-hand" : ""}`} onClick={this.showNumber.bind(this)}>
            <div className="card-body">
              <div className="top">
                <div>
                  <div>{this.props.number}</div>
                  <div className="heart">♦</div>
                </div>
              </div>
              <div className="center">
                <div>
                  {this.props.number}
                </div>
              </div>
              <div className="bottom">
                <div>
                  <div className="heart">♦</div>
                  <div>{this.props.number}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="username_container">
            {this.showUsername()}
          </div>
        </div>
      )
    }
    // Parte trasera de una carta
    else {
      return (
        <div className="card_container">
          <div className="card card-joker">
            <div className="card-body card-back">
            </div>
          </div>
          <div className="username_container">
            {this.showUsername()}
          </div>
        </div>
      )
    }
    
  }
}

export default Card;