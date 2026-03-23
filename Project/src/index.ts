import { createBoard } from "./domain/grid.js"
import { mulberry32 } from "./domain/rng.js"

const board = createBoard(5, 5, 5, mulberry32(123))

console.log("Generated board:")
console.log(board)
