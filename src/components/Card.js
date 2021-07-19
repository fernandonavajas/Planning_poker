import React, { Component } from 'react';
import './Card.scss'

class Card extends Component {
  render() {
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
}

export default Card;