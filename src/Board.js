import React, { useContext } from "react";
import Square from "./Square";
import { SquareContext } from "./Game";


function Board() {
  const squares = useContext(SquareContext);

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} i="0" />
        <Square value={squares[1]} i="1" />
        <Square value={squares[2]} i="2" />
      </div>
      <div className="board-row">
        <Square value={squares[3]} i="3" />
        <Square value={squares[4]} i="4" />
        <Square value={squares[5]} i="5" />
      </div>
      <div className="board-row">
        <Square value={squares[6]} i="6" />
        <Square value={squares[7]} i="7" />
        <Square value={squares[8]} i="8" />
      </div>
    </>
  );
}

export default Board;
