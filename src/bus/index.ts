type ListenerCall = (...args: any[]) => void

class EventBusClass {
  listeners: Map<string, Set<ListenerCall>>

  constructor() {
    this.listeners = new Map<string, Set<ListenerCall>>()
  }
  addEventListener(eventName: string, callback: ListenerCall) {
    let collection = this.listeners.get(eventName)
    if (!collection) {
      collection = new Set<ListenerCall>()
      this.listeners.set(eventName, collection)
    }
    collection.add(callback)
  }
  removeEventListener(eventName: string, callback: ListenerCall) {
    const collection = this.listeners.get(eventName)
    if (!collection) {
      return
    }
    collection.delete(callback)
  }
  hasEventListener(eventName: string, callback?: ListenerCall) {
    const collection = this.listeners.get(eventName)
    if (!collection) {
      return false
    }
    if (!callback) {
      return true
    }
    return collection.has(callback)
  }
  dispatch(eventName: string, ...args: any[]) {
    const collection = this.listeners.get(eventName)
    if (!collection) {
      return
    }
    collection.forEach((callback) => callback(...args))
  }
}
export default new EventBusClass()
