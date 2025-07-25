// Import React and the components we need
import React, { useState } from 'react';
import './App.css';
import GameBoard from './Component/GameBoard';
import DiceRoller from './Component/DiceRoller';
import GameStatus from './Component/GameStatus';

// Main App component - this controls the whole game
const App = () => {
  
  // Game settings
  const TOTAL_SQUARES = 100; // The game board has 100 squares
  
  // Where snakes are located (head position: tail position)
  const snakePositions = {
    17: 7,   // Snake at 17 takes you down to 7
    54: 34,  // Snake at 54 takes you down to 34
    62: 19,  // Snake at 62 takes you down to 19
    64: 60,  // Snake at 64 takes you down to 60
    87: 24,  // Snake at 87 takes you down to 24
    93: 73,  // Snake at 93 takes you down to 73
    95: 75,  // Snake at 95 takes you down to 75
    99: 78,  // Snake at 99 takes you down to 78
  };
  
  // Where ladders are located (bottom position: top position)
  const ladderPositions = {
    4: 14,   // Ladder at 4 takes you up to 14
    9: 31,   // Ladder at 9 takes you up to 31
    20: 38,  // Ladder at 20 takes you up to 38
    28: 84,  // Ladder at 28 takes you up to 84
    40: 59,  // Ladder at 40 takes you up to 59
    51: 67,  // Ladder at 51 takes you up to 67
    63: 81,  // Ladder at 63 takes you up to 81
  };

  // Game state - these variables keep track of what's happening in the game
  const [playerPositions, setPlayerPositions] = useState({ player1: 1, player2: 1 }); // Where each player is
  const [whoseTurn, setWhoseTurn] = useState(1); // Which player's turn it is (1 or 2)
  const [statusMessage, setStatusMessage] = useState(""); // Message to show players
  const [gameWinner, setGameWinner] = useState(null); // Who won the game (null means no winner yet)
  const [isDiceRolling, setIsDiceRolling] = useState(false); // Is the dice currently rolling?

  // This function runs when someone rolls the dice
  const handleDiceRoll = (diceNumber) => {
    // Don't do anything if game is over or dice is already rolling
    if (gameWinner || isDiceRolling) return;
    
    setIsDiceRolling(true); // Show that dice is rolling

    // Figure out which player is playing (player1 or player2)
    const currentPlayerKey = `player${whoseTurn}`;
    
    // Calculate where the player will move to
    let newPosition = playerPositions[currentPlayerKey] + diceNumber;

    // Check if player would go past square 100
    if (newPosition > TOTAL_SQUARES) {
      // Switch to the other player
      setWhoseTurn(whoseTurn === 1 ? 2 : 1);
      setIsDiceRolling(false);
      return;
    }

    // Check if player reached exactly square 100 (wins the game!)
    if (newPosition === TOTAL_SQUARES) {
      // Update player position
      setPlayerPositions(oldPositions => ({ 
        ...oldPositions, 
        [currentPlayerKey]: newPosition 
      }));
      setGameWinner(whoseTurn); // Set the winner
      setStatusMessage(`🎉 Player ${whoseTurn} wins! 🏆`);
      setIsDiceRolling(false);
      return;
    }

    // Check if player landed on a ladder (lucky!)
    if (ladderPositions[newPosition]) {
      newPosition = ladderPositions[newPosition]; // Climb up the ladder
    } 
    // Check if player landed on a snake (unlucky!)
    else if (snakePositions[newPosition]) {
      newPosition = snakePositions[newPosition]; // Slide down the snake
    }

    // Update the player's position on the board
    setPlayerPositions(oldPositions => ({
      ...oldPositions,
      [currentPlayerKey]: newPosition,
    }));

    // Check if player gets another turn (rolled a 6)
    if (diceNumber !== 6) {
      // Switch to the other player
      setWhoseTurn(whoseTurn === 1 ? 2 : 1);
    }
    
    setIsDiceRolling(false); // Dice finished rolling
  };

  // This function starts a new game
  const startNewGame = () => {
    setPlayerPositions({ player1: 1, player2: 1 }); // Both players start at square 1
    setWhoseTurn(1); // Player 1 goes first
    setGameWinner(null); // No winner yet
    setIsDiceRolling(false); // Dice not rolling
  };

  // This is what shows on the screen
  return (
    <div className="app">
      <header>
        <h1>🐍 Snakes and Ladders</h1>
      </header>
      
      <div className="game-container">
        <div className="board-section">
          {/* The game board */}
          <GameBoard
            playersPositions={playerPositions}
            snakes={snakePositions}
            ladders={ladderPositions}
            currentPlayer={whoseTurn}
          />
          
          {/* Shows messages to players */}
          <GameStatus message={statusMessage} />
          
          {/* The dice that players click to roll */}
          <DiceRoller 
            onRoll={handleDiceRoll} 
            disabled={!!gameWinner || isDiceRolling} 
          />
          
          {/* Button to start a new game */}
          <button
            className="reset-button"
            onClick={startNewGame}
            aria-label="Reset the game"
          >
            🔄 Start New Game
          </button>
        </div>
      </div>
      
      {/* Show winner popup when someone wins */}
      {gameWinner && (
        <div className="game-over-modal" role="dialog" aria-labelledby="winner-title">
          <div className="winner-card">
            <h2 id="winner-title">Game Over!</h2>
            <div className="winner-info">
              <div
                className="winner-token"
                style={{ backgroundColor: gameWinner === 1 ? '#FF6B6B' : '#4ECDC4' }}
                aria-hidden="true"
              ></div>
              <h3>Player {gameWinner} Wins!</h3>
            </div>
            <button
              className="play-again-button"
              onClick={startNewGame}
              aria-label="Play again"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      
      {/* Legend showing what snakes and ladders look like */}
      <div className="legend" aria-label="Game legend">
        <div><span className="legend-snake"></span> Snake</div>
        <div><span className="legend-ladder"></span> Ladder</div>
      </div>
    </div>
  );
};

export default App;