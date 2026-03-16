
import { neighbors } from "./domain/grid.js"

const result = neighbors({ x: 1, y: 1 })

console.log("Neighbors of (1,1):")
console.log(result)
