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

  render() {
    return (
      <Router>
        <Alert/>
        <Navbar title="Planning Poker"/>
          <Switch>
            
            <Route path="/room/:id" exact>
              <Room />
            </Route>

            <Route path="/" exact>
                <Lobby/>
            </Route>
          </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
