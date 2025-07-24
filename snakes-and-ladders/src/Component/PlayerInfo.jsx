import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ player, position, isActive }) => {
  return (
    <div className={`player-info ${isActive ? 'active' : ''}`}>
      <div 
        className="player-token-indicator" 
        style={{ backgroundColor: player.color }}
      ></div>
      <div className="player-details">
        <h3>{player.name}</h3>
        <p>Position: {position}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;