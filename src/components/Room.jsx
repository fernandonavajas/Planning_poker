import React from 'react'
import { useParams } from 'react-router-dom';

// Componentes
import PokerHand from './PokerHand';
import PokerPot from './PokerPot';

import "./Room.scss"

const Room = () => {
  const { id } = useParams();

  return (
    <div className="Room">
      <PokerPot room_id={id}/>
      <PokerHand room_id={id}/>
    </div>
  )
}

export default Room
