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
      users: [],
      room_id: ""
    };
  }

  componentDidMount() {

    const room_id = this.props.match.params.id;
    this.fetchData(room_id);
  }
  fetchData = room_id => {
    this.setState({
      room_id: room_id
    })
    socket.emit('new_user', room_id);
  };

  render() {

    const room_id = this.state.room_id
    const users = this.state.users
    return (
      <div className="Room">
        <PokerPot room_id={room_id}  />
        <PokerHand room_id={room_id} />
      </div>
    );
  }
}

export default withRouter(Room);
