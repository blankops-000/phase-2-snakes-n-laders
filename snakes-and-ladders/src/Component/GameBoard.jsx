import React from 'react';
import './GameBoard.css';

const BOARD_SIZE = 10;

const GameBoard = ({ playersPositions, snakes, ladders, currentPlayer }) => {
  const renderBoard = () => {
    const cells = [];
    
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      const rowCells = [];
      
      for (let col = 0; col < BOARD_SIZE; col++) {
        const displayCol = row % 2 === 0 ? col : BOARD_SIZE - 1 - col;
        const cellNumber = row * BOARD_SIZE + displayCol + 1;
        
        const playersOnCell = Object.entries(playersPositions)
          .filter(([_, position]) => position === cellNumber)
          .map(([playerId]) => playerId);
        
        rowCells.push(
          <div 
            key={cellNumber} 
            className={`board-cell ${cellNumber === 100 ? 'finish' : ''} ${
              snakes[cellNumber] ? 'snake' : ''
            } ${ladders[cellNumber] ? 'ladder' : ''}`}
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
                className="player-token"
                style={{ 
                  backgroundColor: playerId === '1' ? '#FF6B6B' : '#4ECDC4'
                }}
                title={`Player ${playerId}${playerId == currentPlayer ? ' (current)' : ''}`}
                aria-label={`Player ${playerId}${playerId == currentPlayer ? ' (current player)' : ''}`}
              ></div>
            ))}
          </div>
        );
      }
      
      cells.push(...rowCells);
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