import { Board, Cell, CellView, Pos } from "./types.js"

export const indexOf = (width: number, pos: Pos): number =>
  pos.y * width + pos.x

export const inBounds = (
  width: number,
  height: number,
  pos: Pos
): boolean =>
  pos.x >= 0 &&
  pos.x < width &&
  pos.y >= 0 &&
  pos.y < height

export const neighbors = (pos: Pos): Pos[] => [
  { x: pos.x - 1, y: pos.y - 1 },
  { x: pos.x, y: pos.y - 1 },
  { x: pos.x + 1, y: pos.y - 1 },
  { x: pos.x - 1, y: pos.y },
  { x: pos.x + 1, y: pos.y },
  { x: pos.x - 1, y: pos.y + 1 },
  { x: pos.x, y: pos.y + 1 },
  { x: pos.x + 1, y: pos.y + 1 }
]

export const positions = (
  width: number,
  height: number
): Pos[] =>
  Array.from({ length: width * height }, (_, i) => ({
    x: i % width,
    y: Math.floor(i / width)
  }))

export const countAdjacentMines = (
  width: number,
  height: number,
  mineIndexes: ReadonlySet<number>,
  pos: Pos
): number =>
  neighbors(pos)
    .filter((p) => inBounds(width, height, p))
    .map((p) => indexOf(width, p))
    .filter((i) => mineIndexes.has(i))
    .length

const makeView = (width: number, height: number): CellView[] =>
  Array.from({ length: width * height }, () => ({ kind: "Hidden" }))

const makeCells = (
  width: number,
  height: number,
  mineIndexes: ReadonlySet<number>
): Cell[] =>
  positions(width, height).map((pos) => {
    const idx = indexOf(width, pos)

    if (mineIndexes.has(idx)) {
      return { kind: "Mine" }
    }

    return {
      kind: "Empty",
      adjacentMines: countAdjacentMines(width, height, mineIndexes, pos)
    }
  })

export const createBoard = (
  width: number,
  height: number,
  mineCount: number,
  nextRandom: () => number
): Board => {
  const total = width * height
  const safeMineCount = Math.max(0, Math.min(mineCount, total - 1))

  const shuffledIndexes = Array.from({ length: total }, (_, i) => i)
    .map((i) => ({ i, key: nextRandom() }))
    .sort((a, b) => a.key - b.key)
    .slice(0, safeMineCount)
    .map((item) => item.i)

  const mineIndexes = new Set<number>(shuffledIndexes)

  return {
    width,
    height,
    cells: makeCells(width, height, mineIndexes),
    view: makeView(width, height)
  }
}

export const getCell = (board: Board, pos: Pos): Cell | undefined => {
  if (!inBounds(board.width, board.height, pos)) {
    return undefined
  }

  return board.cells[indexOf(board.width, pos)]
}

export const getView = (board: Board, pos: Pos): CellView | undefined => {
  if (!inBounds(board.width, board.height, pos)) {
    return undefined
  }

  return board.view[indexOf(board.width, pos)]
}
