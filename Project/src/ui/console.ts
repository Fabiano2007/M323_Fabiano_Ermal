import readline from "node:readline"
import { reveal, toggleFlag } from "../domain/game.js"
import { createBoard } from "../domain/grid.js"
import { mulberry32 } from "../domain/rng.js"
import { GameState } from "../domain/types.js"
import { parseCommand } from "./commands.js"
import { render } from "./render.js"

const initialState = (): GameState => ({
  board: createBoard(5, 5, 5, mulberry32(123)),
  status: "playing"
})

export const startConsoleGame = (): void => {
  let state = initialState()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const draw = () => {
    console.clear()
    console.log(render(state))
  }

  draw()
  rl.setPrompt("> ")
  rl.prompt()

  rl.on("line", (line) => {
    const parsed = parseCommand(line)

    if (!parsed.ok) {
      console.log(parsed.error)
      rl.prompt()
      return
    }

    const { command } = parsed

    if (command.kind === "Quit") {
      rl.close()
      return
    }

    if (command.kind === "Help") {
      console.log("Commands: reveal x y | flag x y | help | quit")
      rl.prompt()
      return
    }

    if (command.kind === "Reveal") {
      state = reveal(state, command.pos)
    }

    if (command.kind === "Flag") {
      state = toggleFlag(state, command.pos)
    }

    draw()

    if (state.status === "won") console.log("You won!")
    if (state.status === "lost") console.log("You lost!")

    rl.prompt()
  })

  rl.on("close", () => {
    console.log("Bye")
    process.exit(0)
  })
}
