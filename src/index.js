import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from './socketConfig';
import './index.scss'

// react roter
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Importar components
import Navbar from './components/Navbar';
import Room from './components/Room';
import Lobby from './components/Lobby';
import Alert from './components/Alert';

// Componente App
// Contiene la logica para la mensajeria de websocket

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // users: [
      //   {
      //     room_id: "Sala_4",
      //     id: "Diego"
      //   },
      // ]
      users: [],

      // dark-mode
      darkMode: false,
    }

  }
  
  componentDidMount() {

    // cuando alguien se une a una sala
    socket.on('new_client', new_client => {
      this.setState({
        users: [new_client, ...this.state.users],
      });
    })
  }

  // cambiar darkMode
  switchDarkMode() {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  }


  render() {
    return (
      <Router>
        <Alert/>
        <Navbar title="Planning Poker" updateDarkMode={this.switchDarkMode.bind(this)}/>
        <div className={`App bg-semi-${this.state.darkMode ? "white" : "black"}`}>
          <Switch>
            
            <Route path="/room/:id" exact>
              <Room />
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
