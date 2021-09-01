import React, { Component } from 'react';

import socket from '../socketConfig';
import Card from './Card';

import './PokerPot.scss';

// Componente PokerPot
// Muestra el pozo de cartas en la mesa
class PokerPot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // cards: [
      //   {
      //     score_poker: 5,
      //     username: "Diego"
      //   }
      // ],
      cards: [],
      show_cards: false,
    }
  }

  componentDidMount() {
    socket.on('new_card_selected', user_list => {
      this.setState({
        cards: user_list
      });
    });

    // Limipiar las cartas
    socket.on('clear_cards', () => {
      this.setState({
        cards: [],
        show_cards: false
      });
    })

    // Mostrar las cartas
    socket.on('show_cards', () => {
      this.setState({
        show_cards: true
      });
    })
  }

  // Levantar evento para limipiar las cartas en todos los usuarios de la sala
  clearCards() {
    socket.emit('clear_card_data', this.props.room_id);
  }

  // Levantar evento para mostrar las cartas en todos los usuarios de la sala
  showCards() {
    socket.emit('show_card_data', this.props.room_id);
  }
  
  admin_buttons() {
    return(
      <div className="admin_buttons">
        <button type="button" className="btn btn-primary btn-sm btn-clear-cards"
                          onClick={this.clearCards.bind(this)} >Limpiar</button>
                  <button type="button" className="btn btn-success btn-sm btn-show-cards"
                          onClick={this.showCards.bind(this)} >Mostrar</button>
      </div>
    )
  };

  render() {

    const show_cards = this.state.show_cards
    const room_id = this.props.room_id

    const cards = this.state.cards.map((card, index) => {
      return(
        <Card number={card.number} show={show_cards} user={card.user} />
      )
    });

    const average = this.state.cards.reduce((total, next) =>
                      total + next.number, 0
                      ) / this.state.cards.length || 0;

    
    const admin_buttons =  room_id === socket.id ? this.admin_buttons() : "";
    
    return (
      <div className="PokerPot">
        <span className="score-element">
          { admin_buttons }
          { show_cards
          ? <p className="score-text">El promedio es de: {average.toFixed(1)} </p>
          : "" }
          
        </span>
        <div className="pot">
          { cards }
        </div>
      </div>
    );
  }
}

export default PokerPot;
