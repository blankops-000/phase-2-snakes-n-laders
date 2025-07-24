import React from 'react';
import './Player.css';

const Player = ({ color }) => {
  return <div className={`player player-${color}`}></div>;
};

export default Player;
