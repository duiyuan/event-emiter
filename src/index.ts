type Callback = (data: any) => void

interface Item {
  once: boolean
  callback: Callback
}

interface Events {
  [method: string]: Item[]
}

export default class SimpleEventEmiter {
  events: Events = {}

  on = (method: string, callback: Callback, once = false) => {
    if (!this.events[method]) {
      this.events[method] = []
    }
    const member = { callback, once }
    this.events[method].push(member)

    return () => {
      this.off(method, callback)
    }
  }

  once = (method: string, callback: Callback) => {
    this.on(method, callback, true)
  }

  off = (method: string, callback: Callback) => {
    const members = this.events[method] || []
    const index = members.findIndex(({ callback: item }) => item === callback)
    if (index === -1) {
      return false
    }
    this.events[method].splice(index, 1)
    return true
  }

  emit = (method: string, data?: any) => {
    const members = this.events[method] || []
    if (members.length === 0) {
      return false
    }

    const rest: Item[] = []
    members.forEach((member) => {
      const { callback, once } = member
      callback(data)
      if (!once) {
        rest.push(member)
      }
    })
    this.events[method] = rest
    return true
  }

  removeListener = (method: string) => {
    if (method) {
      this.events[method] = []
      return true
    }
    return false
  }

  removeAllListener = () => {
    this.events = {}
    return true
  }
}
