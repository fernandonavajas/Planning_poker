import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

// Importar components
import Navbar from './components/Navbar';
import Card from './components/Card'; 
import Cardback from './components/Cardback';

// Componente App
class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    });
  }

  handleSubmit(event){
    const body = event.target.value
    if (event.keyCode === 13 && body ) {
      const message = {
        body,
        from: 'me'
      };
      // hacer que yo tambien pueda ver mis mensajes
      this.setState({messages: [message, ...this.state.messages]})
      this.socket.emit('message', body);
      event.target.value = '';
    }
  }

  render() {

    const messages = this.state.messages.map((message, index) => {
      return(
        <li key={index}>
          <b>{message.from} : {message.body}</b>
        </li>
      )
    });

    return (
      <div className="App">
        <header className="app-header">
          <Navbar title="Planning Poker"/>
        </header>
        <body className="app-body">
          <input
            type="text"
            placeholder="Ingresa una puntuación"
            onKeyUp={this.handleSubmit.bind(this)}
          />
          <h1>Hola estoy en src/index.js</h1>

          <ul>
            {messages}
          </ul>
          <Cardback/>
          <Card number="5"/>
          <Card number="13"/>

        </body>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
