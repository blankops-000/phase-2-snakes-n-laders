import React from 'react';
import './GameBoard.css';
import boardImage from '../assets/Board.jpeg';

const BOARD_SIZE = 10;

const GameBoard = ({ playersPositions, snakes, ladders, currentPlayer }) => {
  const getPositionStyle = (cellNumber) => {
    const row = Math.floor((cellNumber - 1) / BOARD_SIZE);
    const col = (cellNumber - 1) % BOARD_SIZE;
    const displayRow = BOARD_SIZE - 1 - row;
    const displayCol = row % 2 === 0 ? col : BOARD_SIZE - 1 - col;
    
    return {
      position: 'absolute',
      left: `${(displayCol * 10) + 5}%`,
      top: `${(displayRow * 10) + 5}%`,
      transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <div className="game-board" role="grid" aria-label="Snakes and Ladders board">
      <img src={boardImage} alt="Snakes and Ladders Board" className="board-image" />
      {Object.entries(playersPositions).map(([playerId, position]) => (
        <div 
          key={playerId}
          className="player-token"
          style={{
            ...getPositionStyle(position),
            backgroundColor: playerId === 'player1' ? '#FF6B6B' : '#4ECDC4'
          }}
          title={`Player ${playerId.slice(-1)}${playerId === `player${currentPlayer}` ? ' (current)' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default GameBoard;