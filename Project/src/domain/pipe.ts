export const pipe =
  <A>(value: A) =>
  <B>(...fns: Array<(x: any) => any>): B =>
    fns.reduce((acc, fn) => fn(acc), value) as unknown as B

export const compose =
  <A, B, C>(ab: (a: A) => B, bc: (b: B) => C) =>
  (a: A): C =>
    bc(ab(a))
