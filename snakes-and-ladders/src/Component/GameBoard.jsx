import React from 'react';
import './GameBoard.css';
import snakeImg from '../assets/snake-straight.svg';
import ladderImg from '../assets/ladder-transparent.svg';

const BOARD_SIZE = 10;

const GameBoard = ({ playersPositions, snakes, ladders, currentPlayer }) => {
  // Calculate position and size for snakes and ladders
  const calculateExtension = (start, end) => {
    const startRow = Math.floor((start - 1) / 10);
    const startCol = (start - 1) % 10;
    const endRow = Math.floor((end - 1) / 10);
    const endCol = (end - 1) % 10;
    
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);
    const distance = Math.sqrt(rowDiff * rowDiff + colDiff * colDiff);
    
    const angle = Math.atan2(endRow - startRow, endCol - startCol) * (180 / Math.PI);
    
    return {
      width: Math.max(80, distance * 20) + '%',
      height: Math.max(100, distance * 30) + '%',
      rotation: angle
    };
  };
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
            } ${ladders[cellNumber] ? 'ladder' : ''} ${
              cellNumber % 2 === 0 ? 'even' : 'odd'
            }`}
            data-cell={cellNumber}
            aria-label={`Cell ${cellNumber}${snakes[cellNumber] ? ', snake to ' + snakes[cellNumber] : ''}${ladders[cellNumber] ? ', ladder to ' + ladders[cellNumber] : ''}`}
          >
            <span className="cell-number">{cellNumber}</span>
            
            {snakes[cellNumber] && (() => {
              const extension = calculateExtension(cellNumber, snakes[cellNumber]);
              return (
                <img 
                  src={snakeImg} 
                  alt={`Snake to ${snakes[cellNumber]}`}
                  className="snake-icon"
                  title={`Snake to ${snakes[cellNumber]}`}
                  style={{
                    width: extension.width,
                    height: extension.height,
                    transform: `translate(-50%, -50%) rotate(${extension.rotation}deg)`
                  }}
                />
              );
            })()}
            
            {ladders[cellNumber] && (() => {
              const extension = calculateExtension(cellNumber, ladders[cellNumber]);
              return (
                <img 
                  src={ladderImg} 
                  alt={`Ladder to ${ladders[cellNumber]}`}
                  className="ladder-icon"
                  title={`Ladder to ${ladders[cellNumber]}`}
                  style={{
                    width: extension.width,
                    height: extension.height,
                    transform: `translate(-50%, -50%) rotate(${extension.rotation + 90}deg)`
                  }}
                />
              );
            })()}
            
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