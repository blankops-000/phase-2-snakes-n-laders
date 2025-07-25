// Import React and the CSS styles for this component
import React from 'react';
import './GameBoard.css';
import boardImage from '../assets/Board.jpeg';

// This component shows the game board with players on it
const GameBoard = ({ playersPositions, snakes, ladders, currentPlayer }) => {
  
  // The board is 10x10 (10 squares wide, 10 squares tall)
  const SQUARES_PER_ROW = 10;

  // This function calculates where to put a player token on the screen
  const calculatePlayerPosition = (squareNumber) => {
    // Figure out which row and column the square is in
    const row = Math.floor((squareNumber - 1) / SQUARES_PER_ROW);
    const column = (squareNumber - 1) % SQUARES_PER_ROW;
    
    // The board is numbered from bottom to top, so we flip the row
    const displayRow = SQUARES_PER_ROW - 1 - row;
    
    // Every other row goes right-to-left (like a real snakes and ladders board)
    const displayColumn = row % 2 === 0 ? column : SQUARES_PER_ROW - 1 - column;
    
    // Return the position as percentages so it works on any screen size
    return {
      position: 'absolute',
      left: `${(displayColumn * 10) + 5}%`,  // 10% per column, plus 5% to center
      top: `${(displayRow * 10) + 5}%`,      // 10% per row, plus 5% to center
      transform: 'translate(-50%, -50%)'     // Center the token perfectly
    };
  };

  // This is what shows on the screen
  return (
    <div className="game-board" role="grid" aria-label="Snakes and Ladders board">
      {/* The background image of the board */}
      <img src={boardImage} alt="Snakes and Ladders Board" className="board-image" />
      
      {/* Show each player's token on the board */}
      {Object.entries(playersPositions).map(([playerId, position]) => (
        <div 
          key={playerId}
          className="player-token"
          style={{
            ...calculatePlayerPosition(position),
            // Player 1 is red, Player 2 is blue
            backgroundColor: playerId === 'player1' ? '#FF6B6B' : '#4ECDC4'
          }}
          title={`Player ${playerId.slice(-1)}${playerId === `player${currentPlayer}` ? ' (current turn)' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default GameBoard;