export function createBoard(length, existingPieces = []) {
  const board = Array.from({ length }, () => Array.from({ length }).fill(null));
  Object.keys(existingPieces).forEach((key) => {
    const [row, col] = key.split('-');
    board[row][col] = existingPieces[key];
});
  return board;
}
