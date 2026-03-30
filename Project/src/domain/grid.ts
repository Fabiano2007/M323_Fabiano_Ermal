import { Board, Cell, CellView, Pos } from "./types.js"

export const indexOf = (w: number, p: Pos) => p.y * w + p.x

export const inBounds = (w: number, h: number, p: Pos) =>
  p.x >= 0 && p.x < w && p.y >= 0 && p.y < h

export const neighbors = (p: Pos): Pos[] => [
  { x: p.x - 1, y: p.y - 1 },
  { x: p.x, y: p.y - 1 },
  { x: p.x + 1, y: p.y - 1 },
  { x: p.x - 1, y: p.y },
  { x: p.x + 1, y: p.y },
  { x: p.x - 1, y: p.y + 1 },
  { x: p.x, y: p.y + 1 },
  { x: p.x + 1, y: p.y + 1 }
]

export const positions = (w: number, h: number): Pos[] =>
  Array.from({ length: w * h }, (_, i) => ({ x: i % w, y: Math.floor(i / w) }))

export const countAdjacentMines = (
  w: number,
  h: number,
  mines: Set<number>,
  p: Pos
): number =>
  neighbors(p)
    .filter((n) => inBounds(w, h, n))
    .map((n) => indexOf(w, n))
    .filter((i) => mines.has(i))
    .length

const makeView = (w: number, h: number): CellView[] =>
  Array.from({ length: w * h }, () => ({ kind: "Hidden" as const }))

const makeCells = (w: number, h: number, mines: Set<number>): Cell[] =>
  positions(w, h).map((p) => {
    const i = indexOf(w, p)
    if (mines.has(i)) return { kind: "Mine" as const }
    return { kind: "Empty" as const, adjacentMines: countAdjacentMines(w, h, mines, p) }
  })

export const createBoard = (
  w: number,
  h: number,
  mineCount: number,
  rand: () => number
): Board => {
  const total = w * h
  const safeMineCount = Math.max(0, Math.min(mineCount, total - 1))

  const arr = Array.from({ length: total }, (_, i) => ({ i, k: rand() }))
    .sort((a, b) => a.k - b.k)
    .slice(0, safeMineCount)
    .map((x) => x.i)

  const mines = new Set(arr)

  return {
    width: w,
    height: h,
    cells: makeCells(w, h, mines),
    view: makeView(w, h)
  }
}
