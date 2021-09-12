import { std } from 'mathjs';
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
      cards: [],
      show_cards: false,
    }
  }

  componentDidMount() {

    socket.on('update_user_list', user_list => {
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


  renderDesviacion(desviacion) {
    switch(true) {
      case desviacion >= 2:
        return <p className="text-danger">No hay consenso</p>;
      case desviacion >= 1:
        return <p className="text-warning">Consenso de {((1-desviacion/2)*100).toFixed(1)}%</p> 
      case desviacion >= 0.5:
        return <p className="text-info">Consenso de {((1-desviacion/2)*100).toFixed(1)}%</p> 
      case desviacion >= 0:
        return <p className="text-success">Consenso de {((1-desviacion/2)*100).toFixed(1)}%</p> 
      default:
        return <p className="text-danger">No hay consenso</p>;
    }
  }

  renderAverage(average) {
    return <p>El promedio es de: {average.toFixed(1)} </p>
  }

  render() {

    const show_cards = this.state.show_cards
    const room_id = this.props.room_id

    const cards = this.state.cards.map((card, i) => {
      if (card.score_poker != -1) {
        return(
          <Card number={card.score_poker} show={show_cards} user={card.username} pokerhand={false} key={"card-pot" + i}/>
        )
      }
    });

    const average = this.state.cards.filter(user => user.score_poker > -1).reduce((total, next) =>
                      total + next.score_poker, 0
                      ) / this.state.cards.filter(user => user.score_poker > -1).length || 0;

    const desviacion = this.state.cards.filter(user => user.score_poker > -1).length ? std(this.state.cards.filter(user => user.score_poker > -1).map(card => card.score_poker )) : 0;

    const admin_buttons =  room_id === socket.id ? this.admin_buttons() : "";

    return (
      <div className="PokerPot">
        <span className="score-element">
          { admin_buttons }
          { show_cards
            ? <div className="score-text">
                {this.renderAverage(average)}
                { this.renderDesviacion(desviacion) }
              </div>
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
