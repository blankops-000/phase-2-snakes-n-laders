import Cell from './Cell';
import './Board.css';
import boardBg from '../assets/Snakes-and-ladders.jpeg';

const Board = ({ positions, snakes, ladders, BOARD_SIZE }) => {
  const renderBoard = () => {
    const board = [];
    let cellNum = BOARD_SIZE;

    for (let row = 0; row < 10; row++) {
      const rowCells = [];
      const isOddRow = row % 2 === 1;
      const start = cellNum - 9;
      const end = cellNum;
      const nums = isOddRow
        ? Array.from({ length: 10 }, (_, i) => start + i) // left-to-right
        : Array.from({ length: 10 }, (_, i) => end - i);  // right-to-left

      nums.forEach((num) => {
        rowCells.push(
          <Cell
            key={num}
            number={num}
            hasPlayer1={positions.player1 === num}
            hasPlayer2={positions.player2 === num}
            isSnake={!!snakes[num]}
            isLadder={!!ladders[num]}
          />
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
    <div
      className="board"
      style={{
        backgroundImage: `url(${boardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {renderBoard()}
    </div>
  );
};
