import { getCell, getView } from "../domain/grid.js"
import { GameState, Pos } from "../domain/types.js"

const cellChar = (state: GameState, pos: Pos): string => {
  const cell = getCell(state.board, pos)
  const view = getView(state.board, pos)

  if (!cell || !view) return "?"

  if (view.kind === "Hidden") return "■"
  if (view.kind === "Flagged") return "⚑"

  if (state.status === "lost" && cell.kind === "Mine") return "✹"
  if (cell.kind === "Mine") return "■"
  return cell.adjacentMines === 0 ? " " : String(cell.adjacentMines)
}

const header = (width: number): string =>
  "    " + Array.from({ length: width }, (_, i) => String(i).padStart(2, " ")).join(" ")

const rowLine = (state: GameState, y: number): string => {
  const cells = Array.from({ length: state.board.width }, (_, x) =>
    cellChar(state, { x, y }).padStart(2, " ")
  ).join(" ")

  return `${String(y).padStart(2, " ")} | ${cells}`
}

export const render = (state: GameState): string => {
  const lines = [
    `Minesweeper | ${state.board.width}x${state.board.height} | status=${state.status}`,
    header(state.board.width),
    ...Array.from({ length: state.board.height }, (_, y) => rowLine(state, y)),
    "",
    "Commands: reveal x y | flag x y | quit"
  ]

  return lines.join("\n")
}
