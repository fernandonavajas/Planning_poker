import React, { Component } from 'react'
import socket from '../socketConfig';
import Expire from './Expire';

import './Alert.scss'


export class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // messages: [
      //   {
      //     body: "Usuario nuevo en la sala",
      //     from: "Diego"
      //   },
      // ]
      messages: []
    }
  }

  componentDidMount() {

    // cuando alguien ha enviado un mensaje
    socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });

    // cuando alguien se une a una sala
    socket.on('new_client', new_client => {
      let message = {
        body: "Usuario " + new_client.id.slice(10) + " agregado al canal"
      }
      this.setState({
        messages: [message, ...this.state.messages]
      });
    })
  }
  
  render() {

    // Definir variables
    const messages = this.state.messages.map((message, index) => {
      return(
        <Expire delay="2000">
          <div className="alert alert-success" role="alert">
            {message.body}
          </div>
        </Expire>
      )
    });

    return (
      <span className="alerts">
        {messages}
      </span>
    )
  }
}

export default Alert
