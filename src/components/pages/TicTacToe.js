import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./TicTacToe.css";
import FancyButton from "../small/FancyButton";

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", ""]),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(["X", "O"]),
  onRestart: PropTypes.func,
};

const getWinner = (tiles) => {
  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }

  return null;
};

const useTicTacToeGameState = (initialPlayer) => {
  const initialTiles = ["", "", "", "", "", "", "", "", ""];
  const [tiles, setTiles] = useState(initialTiles);
  const firstPlayer = useRef(initialPlayer);
  const winnerReference = useRef(null);
  const GameEndedReference = useRef(false);
  const currentPlayer = firstPlayer.current;
  const winner = winnerReference.current;
  const gameEnded = GameEndedReference.current;

  useEffect(() => {
    firstPlayer.current = firstPlayer.current === "X" ? "O" : "X";
  });

  const setTileTo = (tileIndex, player) => {
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
    setTiles((tiles) =>
      tiles.map((element, index) => {
        return index === tileIndex ? player : element;
      })
    );
  };

  winnerReference.current = getWinner(tiles);
  GameEndedReference.current =
    !(winnerReference.current === null) || !tiles.includes("");

  const restart = () => {
    // Reiniciar el juego a su estado inicial
    setTiles(initialTiles);
    firstPlayer.current = initialPlayer;
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState("X");
  return (
    <div className="tictactoe">
      {/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */}
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      <div className="tictactoe-row">
        <Square
          value={tiles[0]}
          onClick={
            tiles[0] === ""
              ? () => {
                  setTileTo(0, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[1]}
          onClick={
            tiles[1] === ""
              ? () => {
                  setTileTo(1, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[2]}
          onClick={
            tiles[2] === ""
              ? () => {
                  setTileTo(2, currentPlayer);
                }
              : undefined
          }
        />
      </div>
      <div className="tictactoe-row">
        <Square
          value={tiles[3]}
          onClick={
            tiles[3] === ""
              ? () => {
                  setTileTo(3, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[4]}
          onClick={
            tiles[4] === ""
              ? () => {
                  setTileTo(4, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[5]}
          onClick={
            tiles[5] === ""
              ? () => {
                  setTileTo(5, currentPlayer);
                }
              : undefined
          }
        />
      </div>
      <div className="tictactoe-row">
        <Square
          value={tiles[6]}
          onClick={
            tiles[6] === ""
              ? () => {
                  setTileTo(6, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[7]}
          onClick={
            tiles[7] === ""
              ? () => {
                  setTileTo(7, currentPlayer);
                }
              : undefined
          }
        />
        <Square
          value={tiles[8]}
          onClick={
            tiles[8] === ""
              ? () => {
                  setTileTo(8, currentPlayer);
                }
              : undefined
          }
        />
      </div>
    </div>
  );
};
export default TicTacToe;
