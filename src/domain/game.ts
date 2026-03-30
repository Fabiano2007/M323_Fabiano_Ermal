import { getCell, getView, inBounds, neighbors, positions, setView, indexOf } from "./grid.js"
import { Board, GameState, Pos } from "./types.js"

const revealedSafeCount = (board: Board): number =>
  positions(board.width, board.height).reduce((acc, pos) => {
    const cell = getCell(board, pos)
    const view = getView(board, pos)

    if (!cell || !view) return acc
    if (cell.kind === "Empty" && view.kind === "Revealed") return acc + 1
    return acc
  }, 0)

const totalSafeCells = (board: Board): number =>
  board.cells.filter((cell) => cell.kind === "Empty").length

const floodReveal = (board: Board, start: Pos, visited: ReadonlySet<number>): Board => {
  if (!inBounds(board.width, board.height, start)) return board

  const idx = indexOf(board.width, start)
  if (visited.has(idx)) return board

  const cell = getCell(board, start)
  const view = getView(board, start)

  if (!cell || !view) return board
  if (view.kind === "Flagged") return board
  if (cell.kind === "Mine") return board

  const boardAfterReveal =
    view.kind === "Revealed" ? board : setView(board, start, { kind: "Revealed" as const })

  if (cell.adjacentMines > 0) return boardAfterReveal

  const visited2 = new Set<number>([...visited, idx])

  return neighbors(start).reduce(
    (accBoard, nextPos) => floodReveal(accBoard, nextPos, visited2),
    boardAfterReveal
  )
}

export const reveal = (state: GameState, pos: Pos): GameState => {
  if (state.status !== "playing") return state

  const { board } = state
  if (!inBounds(board.width, board.height, pos)) return state

  const view = getView(board, pos)
  const cell = getCell(board, pos)

  if (!view || !cell) return state
  if (view.kind === "Flagged" || view.kind === "Revealed") return state

  if (cell.kind === "Mine") {
    return { ...state, status: "lost" }
  }

  const newBoard = floodReveal(board, pos, new Set<number>())
  const safeCells = totalSafeCells(newBoard)
  const revealed = revealedSafeCount(newBoard)

  return {
    board: newBoard,
    status: revealed === safeCells ? "won" : "playing"
  }
}

export const toggleFlag = (state: GameState, pos: Pos): GameState => {
  if (state.status !== "playing") return state

  const view = getView(state.board, pos)
  if (!view) return state
  if (view.kind === "Revealed") return state

  const nextView =
    view.kind === "Hidden"
      ? ({ kind: "Flagged" } as const)
      : ({ kind: "Hidden" } as const)

  return {
    ...state,
    board: setView(state.board, pos, nextView)
  }
}
