import { GameState, Pos } from "./types.js"
import { indexOf, inBounds } from "./grid.js"

export const reveal = (state: GameState, pos: Pos): GameState => {
  if (state.status !== "playing") return state

  const { board } = state
  if (!inBounds(board.width, board.height, pos)) return state

  const idx = indexOf(board.width, pos)
  const cell = board.cells[idx]

  if (cell.kind === "Mine") {
    return { ...state, status: "lost" }
  }

  const newView = board.view.map((v, i) =>
    i === idx ? { kind: "Revealed" } : v
  )

  return {
    ...state,
    board: { ...board, view: newView }
  }
}
