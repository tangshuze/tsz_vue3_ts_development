type TestState = {
  count: number
  user: {
    age: number
    name: string
  }
}
type TestGetters = {
  doubleCount: (state: TestState) => number
  username: (state: TestState) => string
}
type TestActions = {
  setCount: (count: number) => void
}
