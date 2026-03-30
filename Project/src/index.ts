import { createBoard } from "./domain/grid.js"
import { mulberry32 } from "./domain/rng.js"
import { reveal } from "./domain/game.js"

let state = {
  board: createBoard(5,5,5,mulberry32(123)),
  status: "playing"
}

console.log("Initial:", state.status)

state = reveal(state, {x:2,y:2})

console.log("After reveal:", state.status)
