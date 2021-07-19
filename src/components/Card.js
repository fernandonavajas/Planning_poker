import React, { Component } from 'react';
import './Card.scss'

class Card extends Component {
  render() {
    // Parte delantera de una carta
    if(this.props.number) {
      return (
        <div className="card card-joker">
          <div className="card-body">
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