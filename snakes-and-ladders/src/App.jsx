
import React, { useState } from 'react';
import './App.css';
import GameBoard from './Component/GameBoard';
import DiceRoller from './Component/DiceRoller';
import GameStatus from './Component/GameStatus';


const App = () => {  
  
  

  const TOTAL_SQUARES = 100;
  
  
  
  const snakePositions = {
    17: 7, 
    54: 34,  
    62: 19, 
    64: 60,
    87: 24,  
    93: 73, 
    95: 75, 
    99: 78,  
  };
  
  
  const ladderPositions = {
    4: 14,  
    9: 31,  
    20: 38,  
    28: 84,  
    40: 59,  
    51: 67,
    63: 81,  
  };

  
  const [playerPositions, setPlayerPositions] = useState({ player1: 1, player2: 1 }); 
  const [whoseTurn, setWhoseTurn] = useState(1); 
  const [statusMessage, setStatusMessage] = useState(""); 
  const [gameWinner, setGameWinner] = useState(null); 
  const [isDiceRolling, setIsDiceRolling] = useState(false); 

  
  const handleDiceRoll = (diceNumber) => {
  
    if (gameWinner || isDiceRolling) return;
    
    setIsDiceRolling(true); 

    
    const currentPlayerKey = `player${whoseTurn}`;
    
    
    let newPosition = playerPositions[currentPlayerKey] + diceNumber;

    
    if (newPosition > TOTAL_SQUARES) {
      
      setWhoseTurn(whoseTurn === 1 ? 2 : 1);
      setIsDiceRolling(false);
      return;
    }

    
    if (newPosition === TOTAL_SQUARES) {
      setPlayerPositions(oldPositions => ({
        ...oldPositions,
        [currentPlayerKey]: newPosition
      }));
      setGameWinner(whoseTurn);
      setStatusMessage(`🎉 Player ${whoseTurn} wins! 🏆`);
      setIsDiceRolling(false);
      return;
    }

    if (ladderPositions[newPosition]) { 
      newPosition = ladderPositions[newPosition]; 
    } 
    
    else if (snakePositions[newPosition]) {
      newPosition = snakePositions[newPosition];
    }

  
    setPlayerPositions(oldPositions => ({
      ...oldPositions,
      [currentPlayerKey]: newPosition,
    }));
    
    if (diceNumber !== 6) {

      setWhoseTurn(whoseTurn === 1 ? 2 : 1);
    }
    
    setIsDiceRolling(false); 
  };

  
  const startNewGame = () => {
    setPlayerPositions({ player1: 1, player2: 1 }); 
    setWhoseTurn(1); 
    setGameWinner(null); 
    setIsDiceRolling(false);
  };

  
  return (
    <div className="app">
      <header>
        <h1>🐍 Snakes and Ladders</h1>
      </header>
      
      <div className="game-container">
        <div className="board-section">
        
          <GameBoard
            playersPositions={playerPositions}
            snakes={snakePositions}
            ladders={ladderPositions}
            currentPlayer={whoseTurn}
          />
          
        
          <GameStatus message={statusMessage} />
          
          
          <DiceRoller 
            onRoll={handleDiceRoll} 
            disabled={!!gameWinner || isDiceRolling} 
          />
          
      
          <button
            className="reset-button"
            onClick={startNewGame}
            aria-label="Reset the game"
          >
            🔄 Start New Game
          </button>
        </div>
      </div>
      
      
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
      
  
      <div className="legend" aria-label="Game legend">
        <div><span className="legend-snake"></span> Snake</div>
        <div><span className="legend-ladder"></span> Ladder</div>
      </div>
    </div>
  );
};

export default App;