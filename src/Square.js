import React, { useContext } from "react";
import { SquareContext, SquareClickContext } from "./Game";

function Square({ i }) {
  const squares = useContext(SquareContext);
  const handleClick = useContext(SquareClickContext);

  return (
    <button className="square" onClick={() => handleClick(i)}>
      {squares[i]}
    </button>
  );
}

export default Square;
