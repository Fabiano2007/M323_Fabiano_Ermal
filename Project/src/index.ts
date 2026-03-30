import { createBoard } from "./domain/grid.js"
import { reveal, toggleFlag } from "./domain/game.js"
import { mulberry32 } from "./domain/rng.js"
import { GameState } from "./domain/types.js"
import { render } from "./ui/render.js"

let state: GameState = {
  board: createBoard(5, 5, 5, mulberry32(123)),
  status: "playing"
}

console.log("Initial board:")
console.log(render(state))
console.log("")

state = toggleFlag(state, { x: 0, y: 0 })
console.log("After flagging (0,0):")
console.log(render(state))
console.log("")

state = reveal(state, { x: 2, y: 2 })
console.log("After reveal (2,2):")
console.log(render(state))
