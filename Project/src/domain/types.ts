
export type Pos = {
  x: number
  y: number
}

export type Cell =
  | { kind: "Mine" }
  | { kind: "Empty", adjacentMines: number }

export type CellView =
  | { kind: "Hidden" }
  | { kind: "Revealed" }
  | { kind: "Flagged" }

export type Board = {
  width: number
  height: number
  cells: Cell[]
  view: CellView[]
}
