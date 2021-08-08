import React from 'react'
import { useParams } from 'react-router-dom';

// Componentes
import PokerHand from './PokerHand';
import PokerPot from './PokerPot';

import "./Room.scss"

// Compartir invitación
const inviteLink = () => {
  alert("Copia y comparte la Url que tienes arriba ↑ ")
}

const Room = () => {
  const { id } = useParams();

  return (
    <div className="Room">

      <button type="button" className="btn btn-success share-room" onClick={inviteLink.bind(this)} >Compartir Link</button>
      <PokerPot room_id={id}/>
      <PokerHand room_id={id}/>
    </div>
  )
}

export default Room;
