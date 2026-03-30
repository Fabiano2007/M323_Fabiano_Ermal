import { Pos } from "../domain/types.js"

export type Command =
  | { kind: "Reveal"; pos: Pos }
  | { kind: "Flag"; pos: Pos }
  | { kind: "Quit" }
  | { kind: "Help" }

export type ParseResult =
  | { ok: true; command: Command }
  | { ok: false; error: string }

const toNumber = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export const parseCommand = (input: string): ParseResult => {
  const [cmd, xRaw, yRaw] = input.trim().split(/\s+/)

  if (!cmd) return { ok: false, error: "Please enter a command." }

  if (cmd === "quit") return { ok: true, command: { kind: "Quit" } }
  if (cmd === "help") return { ok: true, command: { kind: "Help" } }

  const x = toNumber(xRaw)
  const y = toNumber(yRaw)

  if (x === undefined || y === undefined) {
    return { ok: false, error: "Usage: reveal x y | flag x y" }
  }

  if (cmd === "reveal") return { ok: true, command: { kind: "Reveal", pos: { x, y } } }
  if (cmd === "flag") return { ok: true, command: { kind: "Flag", pos: { x, y } } }

  return { ok: false, error: "Unknown command. Use: reveal x y | flag x y | help | quit" }
}
