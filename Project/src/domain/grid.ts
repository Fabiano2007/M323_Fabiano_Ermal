
import { Pos } from "./types.js"

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
