import { describe, expect, test } from "vitest"
import { createBoard, countAdjacentMines, indexOf, setView } from "../src/domain/grid.js"
import { reveal, toggleFlag } from "../src/domain/game.js"
import { mulberry32 } from "../src/domain/rng.js"
import { GameState } from "../src/domain/types.js"

describe("grid helpers", () => {
  test("countAdjacentMines works for a center mine", () => {
    const width = 3
    const height = 3
    const mines = new Set<number>([indexOf(width, { x: 1, y: 1 })])

    expect(countAdjacentMines(width, height, mines, { x: 0, y: 0 })).toBe(1)
    expect(countAdjacentMines(width, height, mines, { x: 2, y: 2 })).toBe(1)
    expect(countAdjacentMines(width, height, mines, { x: 0, y: 2 })).toBe(1)
  })

  test("board generation is deterministic for same seed", () => {
    const a = createBoard(5, 5, 5, mulberry32(123))
    const b = createBoard(5, 5, 5, mulberry32(123))

    expect(JSON.stringify(a.cells)).toBe(JSON.stringify(b.cells))
  })
})

describe("game logic", () => {
  test("toggleFlag changes hidden cell to flagged", () => {
    const state: GameState = {
      board: createBoard(5, 5, 5, mulberry32(123)),
      status: "playing"
    }

    const next = toggleFlag(state, { x: 0, y: 0 })
    expect(next.board.view[0]).toEqual({ kind: "Flagged" })
  })

  test("reveal on flagged cell does nothing", () => {
    const board = setView(createBoard(5, 5, 5, mulberry32(123)), { x: 0, y: 0 }, { kind: "Flagged" })
    const state: GameState = { board, status: "playing" }

    const next = reveal(state, { x: 0, y: 0 })
    expect(next).toEqual(state)
  })

  test("winning state is possible on board without mines", () => {
    const state: GameState = {
      board: createBoard(2, 2, 0, mulberry32(123)),
      status: "playing"
    }

    const next = reveal(state, { x: 0, y: 0 })
    expect(next.status).toBe("won")
  })
})
