// import { useReducer } from 'react';
// import { createBoard } from './utils/utils';

// const initialState = {
//   board: createBoard(3),
//   players: {
//     X: { id: 1, piece: 'X', turn: true },
//     O: { id: 2, piece: 'O', turn: false },
//   },
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'MOVE': {
//       const newBoard = [...state.board];
//       newBoard[action.payload.row][action.payload.col] =
//         state.players[state.players.X.turn ? 'X' : 'O'].piece;
//       return {
//         ...state,
//         board: newBoard,
//         players: {
//           X: { ...state.players.X, turn: !state.players.X.turn },
//           O: { ...state.players.O, turn: !state.players.O.turn },
//         },
//       };
//     }
//     case 'RESET':
//       return initialState;
//     default:
//       throw new Error();
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   function handleCellClick(row, col) {
//     if (state.board[row][col] || checkWin()) return;
//     dispatch({ type: 'MOVE', payload: { row, col } });
//     checkWin();
//   }

//   // Your existing checkWin logic here
//   function checkWin() {
//     const currentPlayer = state.players.X.turn ? 'O' : 'X';
//     const winConditions = [
//       // rows
//       ...state.board,
//       // columns
//       ...state.board[0].map((_, i) => state.board.map((row) => row[i])),
//       // diagonals
//       [0, 1, 2].map((i) => state.board[i][i]),
//       [0, 1, 2].map((i) => state.board[i][2 - i]),
//     ];
//     if (
//       winConditions.some((condition) =>
//         condition.every((cell) => cell === currentPlayer),
//       )
//     ) {
//       alert(`${currentPlayer} won!`);
//       return true;
//     }
//     return false;
//   }

//   function reset() {
//     dispatch({ type: 'RESET' });
//   }

//   const currentPlayerDisplay =
//     state.players[state.players.X.turn ? 'X' : 'O'].piece;
//   return (
//     <>
//       <h1>ⓧ Tic Tac Toe 🅾️</h1>
//       <main className="card">
//         <button type="button" onClick={reset}>
//           Reset
//         </button>
//         <section className="info">
//           <p className="emphasis">Current Player: {currentPlayerDisplay}</p>
//         </section>
//         <section className="board">
//           {state.board.map((row, rowIndex) =>
//             row.map((cell, colIndex) => (
//               <button
//                 className="cell"
//                 type="button"
//                 key={colIndex}
//                 onClick={() => handleCellClick(rowIndex, colIndex)}
//               >
//                 {cell}
//               </button>
//             )),
//           )}
//         </section>
//       </main>
//     </>
//   );
// }

// export default App;

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
          forwardDiagonalCounter += 1;
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
          backwardDiagionalCounter += 1;
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
  return (
    <>
      <h1>ⓧ Tic Tac Toe 🅾️</h1>
      <main className="card">
        <button type="button" onClick={reset}>
          Reset
        </button>
        <section className="info">
          <p className="emphasis">Current Player: {currentPlayerDisplay}</p>
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
