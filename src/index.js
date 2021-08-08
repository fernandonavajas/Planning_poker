import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from './socketConfig';
import './index.scss'

// react roter
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Importar components
import Navbar from './components/Navbar';
import Room from './components/Room';
import Expire from './components/Expire';
import Lobby from './components/Lobby';

// Componente App
// Contiene la logica para la mensajeria de websocket

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // messages: [
      //   {
      //     body: "banana",
      //     from: "Diego"
      //   },
      // ]
      messages: [],
      // users: [
      //   {
      //     room_id: "Sala_4",
      //     id: "Diego"
      //   },
      // ]
      users: [],
      // room_id se llena cuando el usuario se conecta a una sala
      room_id: "",

      // dark-mode
      darkMode: false,
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
        users: [new_client, ...this.state.users],
        messages: [message, ...this.state.messages]
      });
    })


    $(document).ready(function(){
      $(".alert-new-client").fadeTo(2000, 500)
    });
  }

  // cambiar darkMode
  switchDarkMode() {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  }


  render() {

    // Definir variables
    const messages = this.state.messages.map((message, index) => {
      return(
        <Expire delay="2000">
          <div className="alert alert-success alert-new-client alert-dismissible fade show" role="alert">
            {message.body}
          </div>
        </Expire>
      )
    });

    return (
      <Router>
        <Navbar title="Planning Poker" updateDarkMode={this.switchDarkMode.bind(this)}/>
        <div className={`App bg-semi-${this.state.darkMode ? "black" : "white"}`}>
          <Switch>
            <Route path="/room/:id" exact>
              <Room />
              <span className="alerts">
                {messages}
              </span>
            </Route>

            <Route path="/" exact>
                <Lobby/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
