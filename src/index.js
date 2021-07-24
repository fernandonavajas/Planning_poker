import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from './socketConfig';

//import io from 'socket.io-client';

// Importar components
import Navbar from './components/Navbar';
import Card from './components/Card'; 
import Rooms from './rooms';

// Componente App
// Contiene la logica para la mensajeria de websocket
class App extends Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    //this.socket = io('/');
    socket.on('message', message => {
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
      socket.emit('message', body);
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
        <Navbar title="Planning Poker"/>
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
          <Rooms/>
          <div className="d-flex">
            <Card number={1} show={false}/>
            <Card number={2} show={true}/>
            <Card number={3} show={true}/>
            <Card number={4} show={true}/>
            <Card number={5} show={true}/>
            <Card number={6} show={true}/>
            <Card number={7} show={true}/>
            <Card number={8} show={true}/>
          </div>


        </body>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
