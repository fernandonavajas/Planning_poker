import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import io from 'socket.io-client';

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
          <nav >
            <a href="" className="text-gray">
              Navegacion
            </a>
          </nav>
        </header>
        <body className="app-body">
          <input
            type="text"
            placeholder="Ingresa una puntuación"
            onKeyUp={this.handleSubmit.bind(this)}
          />
          <h1>Hola estoy en App.js</h1>

          <ul>
            {messages}
          </ul>
        </body>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
