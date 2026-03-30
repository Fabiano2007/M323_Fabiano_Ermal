export type Pos = Readonly<{ x: number; y: number }>

export type Cell =
  | Readonly<{ kind: "Mine" }>
  | Readonly<{ kind: "Empty"; adjacentMines: number }>

export type CellView =
  | Readonly<{ kind: "Hidden" }>
  | Readonly<{ kind: "Revealed" }>
  | Readonly<{ kind: "Flagged" }>

export type Board = Readonly<{
  width: number
  height: number
  cells: ReadonlyArray<Cell>
  view: ReadonlyArray<CellView>
}>

export type GameStatus = "playing" | "won" | "lost"

export type GameState = Readonly<{
  board: Board
  status: GameStatus
}>
