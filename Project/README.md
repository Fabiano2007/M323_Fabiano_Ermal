# M323 Functional Programming Mini Project – Minesweeper

This project implements a console-based Minesweeper game in TypeScript and focuses on functional programming concepts.

## Features

- deterministic board generation with seed-based random numbers
- immutable game state updates
- recursive flood reveal for empty cells
- recursive hidden-cell counting
- flagging
- win and lose conditions
- interactive console commands

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build and Run

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Commands

```txt
reveal x y
flag x y
help
quit
```

## Project Structure

```txt
src/
  domain/
    game.ts
    grid.ts
    pipe.ts
    rng.ts
    types.ts
  ui/
    commands.ts
    console.ts
    render.ts
  index.ts

test/
  game.test.ts
```

## Functional Programming Concepts Used

### Pure Functions
The domain logic is pure. Functions such as `reveal`, `toggleFlag`, `createBoard`, and `render` return new values instead of changing global state.

### Immutability
The board and the game state are never modified in place. Instead, new objects and arrays are created.

### Recursion
The project contains two explicit recursive functions:
- `floodReveal(...)` recursively reveals connected empty cells.
- `countHiddenCells(...)` recursively counts all still hidden cells.

### Higher-Order Functions
The project uses `map`, `filter`, `reduce`, and a small `pipe` helper.

### Type Safety
The project uses TypeScript with strict mode and explicit types for the board, cells, views, and game state.

## What is tested

The tests check:
- adjacent mine counting
- deterministic board generation
- flag toggling
- reveal logic
- win condition
- recursive hidden-cell counting
