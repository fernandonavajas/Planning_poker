import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from './socketConfig';
import './index.scss'
//import io from 'socket.io-client';

// Importar components
import Navbar from './components/Navbar';
import Card from './components/Card'; 
import Rooms from './components/Rooms';

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

    // dar aviso al cliente para cambiar la vista a vista sala
    socket.on('redirect_to_room', room_id => {
      this.setState({
        room_id: room_id
      });
      console.log(this.state)
    })

    // logica para saber cuando el usuario crea o se agrega a una nueva sala
    socket.on('redirect_to_room', room_id => {
      this.setState({
        room_id: room_id
      });
    })

  }

  sendMessageToRoom(event){
    const body = event.target.value
    if (event.keyCode === 13 && body ) {
      const message = {
        body,
        from: 'me',
        // metodo para encontrar en que sala estoy
        to: this.state.users.find(user => user.id === socket.id ).room_id
      };
      // añadir mi mensaje a la lista para que tambien pueda ver mis mensajes
      this.setState({messages: [message, ...this.state.messages]})
      socket.emit('message', message);
      event.target.value = '';
    }
  }

  // Compartir invitación
  inviteLink() {
    console.log(this.state.room_id)
    let msg = "Copia y comparte el codigo: " + (this.state.room_id ? this.state.room_id : socket.id)
    alert(msg)
  }

  // cambiar darkMode
  switchDarkMode() {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  }

  render() {

    // Definir variables
    let room = this.state.room_id

    const messages = this.state.messages.map((message, index) => {
      return(
        <li key={index}>
          <b>{message.from} : {message.body}</b>
        </li>
      )
    });

    return (
      <div className={`App bg-semi-${this.state.darkMode ? "black" : "white"}`}>
        <Navbar title="Planning Poker" updateDarkMode={this.switchDarkMode.bind(this)}/>
          <button type="button" className="btn btn-success share-room"
                  onClick={this.inviteLink.bind(this)} >Compartir Link</button>
          
          { room
            ? <div>
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
                <input
                  type="text"
                  placeholder="Envia un mensaje"
                  onKeyUp={this.sendMessageToRoom.bind(this)}
                />
                <ul>
                  {messages}
                </ul>
              </div>

            : <Rooms/>
          }
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
