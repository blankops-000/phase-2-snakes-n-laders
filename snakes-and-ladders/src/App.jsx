import React, { useState } from 'react';
import './App.css'; // Optional: for styling the board

const App = () => {
  // Game board size
  const BOARD_SIZE = 100;

  // Snake positions: key = head, value = tail (player slides down)
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
  };

  // Ladder positions: key = bottom, value = top (player climbs up)
  const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
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

  // Render game board (simplified UI)
  const renderBoard = () => {
    const board = [];
    let cellNum = BOARD_SIZE;

    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      const isEvenRow = row % 2 === 0;

      const start = cellNum - 9;
      const end = cellNum;
      const step = 1;

      // Create numbers left-to-right or right-to-left depending on row
      const nums = isEvenRow
        ? Array.from({ length: 10 }, (_, i) => end - i)
        : Array.from({ length: 10 }, (_, i) => start + i);

      nums.forEach((num) => {
        const hasPlayer1 = positions.player1 === num;
        const hasPlayer2 = positions.player2 === num;

        rowCells.push(
          <div
            key={num}
            className={`cell ${snakes[num] ? 'snake' : ''} ${
              ladders[num] ? 'ladder' : ''
            }`}
          >
            {num}
            <div className="players">
              {hasPlayer1 && <div className="player player1">P1</div>}
              {hasPlayer2 && <div className="player player2">P2</div>}
            </div>
          </div>
        );
      });

      board.push(
        <div key={row} className="board-row">
          {rowCells}
        </div>
      );
      cellNum -= 10;
    }

    return board;
  };

  return (
    <div className="app">
      <h1>🐍 Snakes and Ladders</h1>

      {/* Game Status */}
      <div className="status">
        <p>{gameMessage}</p>
        {diceValue !== null && <p>Dice: {diceValue}</p>}
      </div>

      {/* Game Board */}
      <div className="board">{renderBoard()}</div>

      {/* Controls */}
      <div className="controls">
        {!winner && (
          <button onClick={rollDice} disabled={!!winner}>
            🎲 Roll Dice (Player {currentPlayer})
          </button>
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