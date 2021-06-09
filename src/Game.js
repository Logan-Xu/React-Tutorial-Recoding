import React, { useState } from "react";
import Board from "./Board";

const historyInit = [];

export const SquareContext = React.createContext();
export const SquareClickContext = React.createContext();

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState(historyInit);

  let winner = null;

  const recordHistory = (squares) => {
    setHistory((prevHistory) => {
      const history = prevHistory.concat([squares]);
      return history;
    });
  };

  const handleClick = (i) => {
    if (!winner && squares[i] === null) {
      setSquares((prevSquares) => {
        const squares = prevSquares.slice();

        squares[i] = xIsNext ? "X" : "O";

        return squares;
      });

      setXIsNext(!xIsNext);
      recordHistory(squares);
    }
  };

  const calculateWinner = (squares) => {
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
    if (squares) {
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
    }
    return null;
  };

  winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "winner: " + winner;
  } else {
    status = "next player: " + (xIsNext ? "X" : "O");
  }

  const jumpTo = (move) => {
    console.log("move: ", move);
    console.log("prevHistory: ", history);

    const historyTemp = history.slice(0, move + 1)
    console.log("historyTemp: ", historyTemp)

    setHistory(historyTemp.slice(0, historyTemp.length - 1));

    console.log("Modified history: ", history);

    setSquares(historyTemp[historyTemp.length - 1]);
    setXIsNext(!(move % 2));
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <SquareContext.Provider value={squares}>
        <SquareClickContext.Provider value={handleClick}>
          <div className="game">
            <div className="game-board">
              <Board squares={squares} />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </SquareClickContext.Provider>
      </SquareContext.Provider>
    </>
  );
}

export default Game;
