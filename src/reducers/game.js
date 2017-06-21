import { CHOOSE_SIDE, PLAYER_MOVE, CPU_MOVE } from '../actions/types';
import { drawInCell } from '../utils/drawing';
import { isWinning, returnBestCell } from '../utils/game';

const INIT_STATE = {
  board: [0, 0, 0, 0, 0, 0, 0, 0, 0,],
  tmpBoard: [
    'x', 0, 'o',
    'x', 0, 'o',
    0, 0, 0,
  ],
  isMoving: 'player',
  playerSymbol: 'x',
};

const game = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHOOSE_SIDE:
      return {
        ...state,
        isMoving: action.payload.side === 'x' ? 'player' : 'cpu',
        playerSymbol: action.payload.side,
      };
    case PLAYER_MOVE:
      console.log('player moves!');
      if (state.board[action.payload - 1] === 0) {
        const newBoard = [
          ...state.board.slice(0, action.payload - 1),
          state.playerSymbol,
          ...state.board.slice(action.payload)
        ];

        drawInCell(action.payload, state.playerSymbol);

        if (isWinning(newBoard, state.playerSymbol)) {
          console.log('player won!');
          return state;
        } else {
          return {
            ...state,
            board: newBoard,
            isMoving: 'cpu',
          };
        }
      }
      return state;
    case CPU_MOVE:
      console.log('cpu moves!');
      const cpuSymbol = state.playerSymbol === 'x' ? 'o' : 'x',
            bestCell = returnBestCell(state.board, cpuSymbol),
            newBoard = [
              ...state.board.slice(0, bestCell - 1),
              cpuSymbol,
              ...state.board.slice(bestCell)];;

      drawInCell(bestCell + 1, cpuSymbol);

      console.log(state.board);
      console.log(bestCell);

      if (isWinning(newBoard, cpuSymbol)) {
        console.log('cpu won!');
        return state;
      } else {
        return {
          ...state,
          board: newBoard,
          isMoving: 'player',
        };
      }
    default:
      return state;
  }
};

export default game;