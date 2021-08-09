import React, { Component } from "react";
import socket from "../socketConfig";
import { withRouter } from "react-router";

// Componentes
import PokerHand from "./PokerHand";
import PokerPot from "./PokerPot";

import "./Room.scss";

class Room extends Component {
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
      room_id: ""
    };
  }

  componentDidMount() {

    const room_id = this.props.match.params.id;
    this.fetchData(room_id);



    // cuando alguien se une a una sala
    socket.on("new_client", (new_client) => {
      this.setState({
        users: [new_client, ...this.state.users],
      });
    });

  }
  fetchData = room_id => {
    this.setState({
      room_id: room_id
    })
    socket.emit('new_user', room_id);
  };

  // Compartir invitación
  inviteLink() {
    alert("Copia y comparte la Url que tienes arriba ↑ ");
  }

  render() {

    const room_id = this.state.room_id
    return (
      <div className="Room">
        <button
          type="button"
          className="btn btn-success share-room"
          onClick={this.inviteLink.bind(this)}
        >
          Compartir Link
        </button>
        <PokerPot room_id={room_id} />
        <PokerHand room_id={room_id} />
      </div>
    );
  }
}

export default withRouter(Room);
