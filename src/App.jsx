import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { winningCombinations } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function activePlayerHelp(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
     currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD.map(array=> [...array])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of winningCombinations) {
    const firstSqSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqSymbol = gameBoard[combination[1].row][combination[1].column]; 
    const thirdSqSymbol = gameBoard[combination[2].row][combination[2].column]; 

    if (
      firstSqSymbol &&
      firstSqSymbol === secondSqSymbol &&
      firstSqSymbol === thirdSqSymbol
    ) {
      winner = players[firstSqSymbol];
    }
  }
  return winner;
}


function App() {
  const [players, setPlayers]= useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = activePlayerHelp(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSq(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = activePlayerHelp(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onNameChange= {handleNameChange} 
          />
          <Player
            name={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onNameChange= {handleNameChange} 
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRematch} />}
        <GameBoard
          onSelectSq={handleSelectSq}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
