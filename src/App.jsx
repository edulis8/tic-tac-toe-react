import { useEffect, useState } from 'react';
import './App.css';
import { createBoard } from './utils/utils';

function App() {
  const [board, setBoard] = useState(createBoard(3));
  const [existingPieces, setExistingPieces] = useState({});

  const [players, setPlayers] = useState({
    X: { id: 1, piece: 'X', turn: true },
    O: { id: 2, piece: 'O', turn: false },
    currentPlayer: 'X',
  });

  useEffect(() => {
    console.table(board);
  }, []);

  function handleCellClick(currentPlayer, row, col) {
    move(currentPlayer, row, col);
  }

  function move(currentPlayer, row, col) {
    const squareKey = `${row}-${col}`;
    if (existingPieces[squareKey]) return; // prevent re-clicking
    const newExistingPieces = {
      ...existingPieces,
      [squareKey]: currentPlayer,
    };
    setExistingPieces(newExistingPieces);
    const newBoard = createBoard(3, newExistingPieces);
    setBoard(newBoard);
    const endOfGame = determineWinner(newBoard, currentPlayer, row, col);
    if (!endOfGame) {
      setNewPlayer(currentPlayer);
    }
  }

  function setNewPlayer(currentPlayer) {
    const newPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const oldPlayer = currentPlayer === 'X' ? 'X' : 'O';

    const newPlayers = {
      ...players,
      currentPlayer: newPlayer,
    };
    newPlayers[newPlayer].turn = true;
    newPlayers[oldPlayer].turn = false;
    setPlayers(newPlayers);
  }

  function determineWinner(board, currentPlayer, row, col) {
    // check row
    if (board[row].every((el) => el === currentPlayer)) {
      return alertWon(currentPlayer);
    }

    if (board.every((_row) => _row[col] === currentPlayer)) {
      return alertWon(currentPlayer);
    }

    if (row - col === 0) {
      let forwardDiagonalCounter = 0;
      for (let i = 0; i < board.length; i++) {
        if (board[i][i] === currentPlayer) {
          forwardDiagonalCounter++;
        } else {
          break;
        }
      }
      if (forwardDiagonalCounter === board.length) {
        return alertWon(currentPlayer);
      }
    }

    if (row + col === board.length - 1) {
      let backwardDiagionalCounter = 0;
      for (let i = 0; i < board.length; i++) {
        if (board[i][board.length - i - 1] === currentPlayer) {
          backwardDiagionalCounter++;
        } else {
          break;
        }
      }
      if (backwardDiagionalCounter === board.length) {
        return alertWon(currentPlayer);
      }
    }
  }

  function alertWon(currentPlayer) {
    alert(`${currentPlayer} won!`);
    return true;
  }

  function reset() {
    setBoard(createBoard(3));
    setExistingPieces([]);
  }

  const currentPlayerDisplay = players[players.currentPlayer].piece;
  const turnDebugDisplay = players[players.currentPlayer].turn; // todo del m e
  return (
    <>
      <h1>ⓧ Tic Tac Toe 🅾️</h1>
      <main className="card">
        <button type="button" onClick={reset}>
          Reset
        </button>
        <section className="info">
          <p className="emphasis">Current Player: {currentPlayerDisplay}</p>
          <pre>Turn: {turnDebugDisplay.toString()}</pre>
        </section>
        <section className="board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                type="button"
                onClick={() =>
                  handleCellClick(players.currentPlayer, rowIndex, colIndex)
                }
                className="cell"
                key={colIndex}
              >
                {cell}
              </button>
            )),
          )}
        </section>
      </main>
      <footer>Made with 🧡</footer>
    </>
  );
}

export default App;
