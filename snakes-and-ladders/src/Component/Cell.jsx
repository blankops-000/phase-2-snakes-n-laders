import React from 'react';
import './Board.css';

const Cell = ({ number, hasPlayer1, hasPlayer2, isSnake, isLadder }) => {
  return (
    <div className={`cell${isSnake ? ' snake' : ''}${isLadder ? ' ladder' : ''}`}>
      <span className="cell-number">{number}</span>
      {hasPlayer1 && <span className="player player1">1</span>}
      {hasPlayer2 && <span className="player player2">2</span>}
      {isSnake && <span className="cell-icon">🐍</span>}
      {isLadder && <span className="cell-icon">🪜</span>}
    </div>
  );
};

export default Cell;
