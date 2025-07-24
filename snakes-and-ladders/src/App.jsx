import React, { useState } from 'react';
import './App.css';
// Image is referenced in CSS
// import boardImg from './assets/Snakes-and-ladders.jpeg';
import Board from './Component/Board';
import Dice from './Component/Dice';
import DiceRollButton from './Component/DiceRollButton';

const App = () => {
  // Game board size
  const BOARD_SIZE = 100;

  // Snake positions: key = head, value = tail (player slides down)
  const snakes = {
    17: 7,
    54: 34,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    99: 78,
  };

  // Ladder positions: key = bottom, value = top (player climbs up)
  const ladders = {
    4: 14,
    9: 31,
    20: 38,
    28: 84,
    40: 59,
    51: 67,
    63: 81,
  };

  // Game state
  const [positions, setPositions] = useState({ player1: 1, player2: 1 });
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
  const [diceValue, setDiceValue] = useState(null);
  const [gameMessage, setGameMessage] = useState("🎲 Player 1's turn. Roll the dice!");
  const [winner, setWinner] = useState(null);

  // Roll the dice (1-6)
  const rollDice = () => {
    if (winner) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceValue(roll);

    const playerKey = `player${currentPlayer}`;
    let newPosition = positions[playerKey] + roll;

    // Check win condition
    if (newPosition > BOARD_SIZE) {
      setGameMessage(`🎯 Rolled ${roll}. Too high to move! Switching turn...`);
      switchTurn();
      return;
    }

    if (newPosition === BOARD_SIZE) {
      setPositions((prev) => ({ ...prev, [playerKey]: newPosition }));
      setWinner(currentPlayer);
      setGameMessage(`🎉 Player ${currentPlayer} wins! 🏆`);
      return;
    }

    // Check for ladders
    if (ladders[newPosition]) {
      newPosition = ladders[newPosition];
      setGameMessage(`✅ Player ${currentPlayer} hit a ladder! Climbed to ${newPosition}`);
    }
    // Check for snakes
    else if (snakes[newPosition]) {
      newPosition = snakes[newPosition];
      setGameMessage(`🐍 Oops! Player ${currentPlayer} got bitten! Slid down to ${newPosition}`);
    } else {
      setGameMessage(`🎲 Player ${currentPlayer} moved to ${newPosition}`);
    }

    // Update position
    setPositions((prev) => ({
      ...prev,
      [playerKey]: newPosition,
    }));

    // Switch turn unless double rolled
    if (roll !== 6) {
      switchTurn();
    } else {
      setGameMessage(prev => prev + " 🎉 Rolled a 6! Extra turn!");
    }
  };

  const switchTurn = () => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const resetGame = () => {
    setPositions({ player1: 1, player2: 1 });
    setCurrentPlayer(1);
    setDiceValue(null);
    setGameMessage("🎲 Player 1's turn. Roll the dice!");
    setWinner(null);
  };



  return (
    <div className="app">
      <h1>🐍 Snakes and Ladders</h1>

      {/* Game Status */}
      <div className="status">
        <p>{gameMessage}</p>
        <Dice value={diceValue} />
      </div>

      {/* Game Board */}
      <Board
        positions={positions}
        snakes={snakes}
        ladders={ladders}
        BOARD_SIZE={BOARD_SIZE}
      />

      {/* Controls */}
      <div className="controls">
        {!winner && (
          <DiceRollButton onRoll={rollDice} disabled={!!winner} currentPlayer={currentPlayer} />
        )}
        <button onClick={resetGame}>🔄 Reset Game</button>
      </div>

      {/* Legend */}
      <div className="legend">
        <div><span className="legend-snake"></span> Snake</div>
        <div><span className="legend-ladder"></span> Ladder</div>
      </div>
    </div>
  );
};

export default App;