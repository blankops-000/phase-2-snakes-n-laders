import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [player1Position, setPlayer1Position] = useState(1);
  const [player2Position, setPlayer2Position] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameMessage, setGameMessage] = useState('');

  // Define snakes (position: destination) based on the image
  const snakes = {
    96: 65,
    64: 37,
    43: 17,
    31: 10,
    19: 2
  };
  
  // Define ladders (position: destination) based on the image
  const ladders = {
    2: 38,
    7: 14,
    8: 31,
    15: 26,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    78: 98,
    87: 94
  };

  // Check for win condition
  useEffect(() => {
    if (player1Position === 100) {
      setWinner(1);
      setGameMessage('Player 1 wins!');
      alert('Hurray player 1 won!');
    } else if (player2Position === 100) {
      setWinner(2);
      setGameMessage('Player 2 wins!');
      alert('Hurray player 2 won!');
    }
  }, [player1Position, player2Position]);

  const rollDice = () => {
    if (winner || isRolling) return;

    setIsRolling(true);
    setGameMessage('');
    
    // Simulate dice roll animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Stop rolling after 1 second
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      movePlayer(finalValue);
      setIsRolling(false);
    }, 1000);
  };

  const movePlayer = (steps) => {
    const currentPosition = currentPlayer === 1 ? player1Position : player2Position;
    let newPosition = currentPosition + steps;
    
    // Ensure position doesn't exceed 100
    if (newPosition > 100) {
      setGameMessage(`Oops! You need exact roll to reach 100. Stay at ${currentPosition}.`);
      newPosition = currentPosition;
    } else {
      // Check for snakes
      if (snakes[newPosition]) {
        setTimeout(() => {
          setGameMessage(`Oh no! Player ${currentPlayer} got bitten by a snake! Sliding down...`);
        }, 500);
        newPosition = snakes[newPosition];
      }
      
      // Check for ladders
      else if (ladders[newPosition]) {
        setTimeout(() => {
          setGameMessage(`Yay! Player ${currentPlayer} climbed a ladder! Going up...`);
        }, 500);
        newPosition = ladders[newPosition];
      }
    }
    
    // Update player position
    if (currentPlayer === 1) {
      setPlayer1Position(newPosition);
      if (newPosition !== 100) { // Only switch if not won
        setCurrentPlayer(2);
      }
    } else {
      setPlayer2Position(newPosition);
      if (newPosition !== 100) { // Only switch if not won
        setCurrentPlayer(1);
      }
    }
  };

  const resetGame = () => {
    setPlayer1Position(1);
    setPlayer2Position(1);
    setCurrentPlayer(1);
    setDiceValue(null);
    setWinner(null);
    setGameMessage('');
  };

  // Create board cells
  const createBoardCells = () => {
    const cells = [];
    for (let row = 10; row >= 1; row--) {
      const rowStart = (row - 1) * 10 + 1;
      const rowEnd = row * 10;
      
      if (row % 2 === 0) {
        // Even rows (right to left)
        for (let i = rowEnd; i >= rowStart; i--) {
          cells.push(
            <div 
              key={i} 
              className={`cell ${i % 2 === 0 ? 'cell-blue' : 'cell-pink'}`}
              id={`cell-${i}`}
            >
              {i}
              {player1Position === i && <div className="player-token player1"></div>}
              {player2Position === i && <div className="player-token player2"></div>}
            </div>
          );
        }
      } else {
     
        for (let i = rowStart; i <= rowEnd; i++) {
          cells.push(
            <div 
              key={i} 
              className={`cell ${i % 2 === 0 ? 'cell-blue' : 'cell-pink'}`}
              id={`cell-${i}`}
            >
              {i}
              {player1Position === i && <div className="player-token player1"></div>}
              {player2Position === i && <div className="player-token player2"></div>}
            </div>
          );
        }
      }
    }
    return cells;
  };

  return (
    <div className="app">
      <div className="board-container">
        <h1 className="board-title">:SNAKES AND LADDERS:</h1>
        
        <div className="player-info">
          <div className={`player-card ${currentPlayer === 1 && !winner ? 'active' : ''}`}>
            <div className="player-indicator player1-indicator"></div>
            <span>Player 1 {winner === 1 ? '(Winner!)' : ''}</span>
          </div>
          <div className={`player-card ${currentPlayer === 2 && !winner ? 'active' : ''}`}>
            <div className="player-indicator player2-indicator"></div>
            <span>Player 2 {winner === 2 ? '(Winner!)' : ''}</span>
          </div>
        </div>
        
        <div className="board">
          {createBoardCells()}
          
        
          <div className="snake snake-96"></div>
          <div className="snake snake-64"></div>
          <div className="snake snake-43"></div>
          <div className="snake snake-31"></div>
          <div className="snake snake-19"></div>
          
          
          <div className="ladder ladder-2"></div>
          <div className="ladder ladder-7"></div>
          <div className="ladder ladder-8"></div>
          <div className="ladder ladder-15"></div>
          <div className="ladder ladder-28"></div>
          <div className="ladder ladder-36"></div>
          <div className="ladder ladder-51"></div>
          <div className="ladder ladder-71"></div>
          <div className="ladder ladder-78"></div>
          <div className="ladder ladder-87"></div>
        </div>
        
        <div className="dice-container">
          {gameMessage && <p className="game-message">{gameMessage}</p>}
          <div className="dice-value">{diceValue ? `Dice: ${diceValue}` : 'Roll the dice!'}</div>
          <button 
            className="dice-roll-button" 
            onClick={rollDice} 
            disabled={isRolling || winner}
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
          {winner && (
            <button className="reset-button" onClick={resetGame}>Play Again</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;