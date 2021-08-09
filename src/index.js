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
import Lobby from './components/Lobby';
import Alert from './components/Alert';
import Room from './components/Room';



// Componente App
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount() {

    
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

            <Route path="/rooms" exact>
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
