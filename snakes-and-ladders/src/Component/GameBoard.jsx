import React from 'react';
import './GameBoard.css';

const BOARD_SIZE = 10;

const GameBoard = ({ playersPositions, snakes, ladders, currentPlayer }) => {
  const renderBoard = () => {
    const cells = [];
    
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const displayCol = row % 2 === 0 ? BOARD_SIZE - 1 - col : col;
        const cellNumber = row * BOARD_SIZE + displayCol + 1;
        
        const playersOnCell = Object.entries(playersPositions)
          .filter(([_, position]) => position === cellNumber)
          .map(([playerId]) => playerId);
        
        cells.push(
          <div 
            key={cellNumber} 
            className={`board-cell ${cellNumber === 100 ? 'finish' : ''} ${
              snakes[cellNumber] ? 'snake' : ''
            } ${ladders[cellNumber] ? 'ladder' : ''} ${
              cellNumber % 2 === 0 ? 'cell-blue' : 'cell-pink'
            }`}
            aria-label={`Cell ${cellNumber}${snakes[cellNumber] ? ', snake to ' + snakes[cellNumber] : ''}${ladders[cellNumber] ? ', ladder to ' + ladders[cellNumber] : ''}`}
          >
            <span className="cell-number">{cellNumber}</span>
            
            {snakes[cellNumber] && (
              <div className="snake-icon" title={`Snake to ${snakes[cellNumber]}`}>
                🐍
              </div>
            )}
            
            {ladders[cellNumber] && (
              <div className="ladder-icon" title={`Ladder to ${ladders[cellNumber]}`}>
                🪜
              </div>
            )}
            
            {playersOnCell.map(playerId => (
              <div 
                key={playerId}
                className={`player-token ${playerId === currentPlayer ? 'active' : ''}`}
                style={{ 
                  backgroundColor: playerId === '1' ? 'purple' : '#36c9ff'
                }}
                title={`Player ${playerId}${playerId == currentPlayer ? ' (current)' : ''}`}
                aria-label={`Player ${playerId}${playerId == currentPlayer ? ' (current player)' : ''}`}
              ></div>
            ))}
          </div>
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="game-board" role="grid" aria-label="Snakes and Ladders board">
      {renderBoard()}
    </div>
  );
};

export default GameBoard;