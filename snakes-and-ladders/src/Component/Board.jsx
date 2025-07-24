import React from 'react';
import Player from './Player';
import './Board.css';

const Board = ({ positions }) => {
  const cells = [];
  for (let i = 100; i > 0; i -= 10) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const num = i - j;
      row.push(
        <div className="cell" key={num}>
          <span className="cell-number">{num}</span>
          {positions[0] === num && <Player color="red" />}
          {positions[1] === num && <Player color="blue" />}
        </div>
      );
    }
    if (Math.floor(i / 10) % 2 === 0) row.reverse();
    cells.push(...row);
  }

  return <div className="board">{cells}</div>;
};

export default Board;
