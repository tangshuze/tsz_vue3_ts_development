import { defineStore } from 'pinia'

// 在此约束类型不管编写或使用都可有较好的提示
export const useTestStore = defineStore<string, TestState, TestGetters, TestActions>('TestId', {
  state: () => ({
    count: 10,
    user: {
      age: 18,
      name: 'tsz'
    }
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    username: (state) => state.user.name
  },
  actions: {
    setCount(count: number) {
      this.count = count
    }
  },
})
