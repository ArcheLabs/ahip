export const GOMOKU_APPLET_ID = "gomoku-local-applet";
export const GOMOKU_BOARD_BLOCK_TYPE = "org.ahip.examples/gomoku.board";
export const GOMOKU_WIDGET_TYPE = "org.ahip.examples/gomoku.widget";

export type GomokuCell = "empty" | "human" | "agent";

export interface GomokuMove {
  player: "human" | "agent";
  coordinate: string;
}

export interface GomokuBoardData extends Record<string, unknown> {
  size: 15;
  cells: GomokuCell[][];
  next_player: "human" | "agent";
  winner?: "human" | "agent" | "draw";
  legal_moves: string[];
  move_history: GomokuMove[];
}

export function createEmptyBoard(): GomokuCell[][] {
  return Array.from({ length: 15 }, () =>
    Array.from({ length: 15 }, () => "empty" as const)
  );
}

export function applyMoves(moves: GomokuMove[]): GomokuCell[][] {
  const board = createEmptyBoard();

  for (const move of moves) {
    const column = move.coordinate.toUpperCase().charCodeAt(0) - 65;
    const row = Number.parseInt(move.coordinate.slice(1), 10) - 1;

    if (Number.isNaN(column) || Number.isNaN(row) || row < 0 || column < 0) {
      continue;
    }

    board[row]![column] = move.player;
  }

  return board;
}

export function createBoardData(input: {
  nextPlayer: "human" | "agent";
  moves: GomokuMove[];
  legalMoves: string[];
  winner?: "human" | "agent" | "draw";
}): GomokuBoardData {
  return {
    size: 15,
    cells: applyMoves(input.moves),
    next_player: input.nextPlayer,
    winner: input.winner,
    legal_moves: input.legalMoves,
    move_history: input.moves
  };
}

export function gomokuFallbackText(board: GomokuBoardData): string {
  const history =
    board.move_history.length > 0
      ? board.move_history.map((move) => `${move.player}:${move.coordinate}`).join(", ")
      : "no moves yet";

  return `Gomoku (Five in a Row): next player ${board.next_player}; winner ${board.winner ?? "none"}; moves ${history}.`;
}
