import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill()
        .map((_, row) => {
          return (
            <div className="board-row">
              {Array(3)
                .fill()
                .map((_, col) => {
                  let index = row * 3 + col;
                  return (
                    <Square
                      value={squares[index]}
                      onSquareClick={() => handleClick(index)}
                    />
                  );
                })}
            </div>
          );
        })}
    </>
  );
}
export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  
  const [isAscending, setIsAscending] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    console.log({ nextSquares });
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description =move >0 &&
       `You are at move #${move}` 
    return description && (
      <li key={move}>
        <span onClick={() => jumpTo(move)}>{description}</span>
      </li>
    );
  });
  const sortedMoves = isAscending?moves:[...moves].reverse()
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
       

        <button onClick={() => setIsAscending(!isAscending)}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
        <ul>{sortedMoves}</ul>

      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
