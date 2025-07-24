import React from 'react';
import './GameStatus.css';

const GameStatus = ({ message }) => {
  return (
    <div className="game-status">
      <p>{message}</p>
    </div>
  );
};

export default GameStatus;