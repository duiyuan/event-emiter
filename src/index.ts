type Callback = (data: any) => void

interface Item {
  once: boolean
  callback: Callback
  subscribeId?: string
}

interface Events {
  [method: string]: Item[]
}

interface Decrator {
  // 只触发一次，则接触订阅
  once: boolean
  // 订阅id，作为当前回调的唯一识别，emit时配合事件名，过滤使用
  subscribeId?: string
}

export default class SimpleEventEmiter {
  events: Events = {}

  on = (method: string, callback: Callback, decrator: Decrator) => {
    if (!this.events[method]) {
      this.events[method] = []
    }
    const { once = false, subscribeId } = decrator
    const member = { callback, once, subscribeId }
    this.events[method].push(member)

    return () => {
      this.off(method, callback)
    }
  }

  once = (method: string, callback: Callback, subscribeId?: string) => {
    this.on(method, callback, { subscribeId, once: true })
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
  /**
   * 事件发布
   * @param {string} method 事件/方法名称
   * @param {any} data 数据
   * @param {string} subcribeId 订阅id。即当前仅触发匹配订阅id+事件名的回调
   */
  emit = (method: string, data: any, subcribeId?: string) => {
    const members = this.events[method] || []
    if (members.length === 0) {
      return false
    }

    const rest: Item[] = []
    members.forEach((member) => {
      const { callback, once, subscribeId: uid } = member
      let fired = false
      // 指定了订阅id，则仅触发 指定订阅id的回调
      // 解决同一个事件名，被多个回调订阅，事件发布时，多个回调可能需要更具体的条件(配合subscribeid)甄别触发
      if (subcribeId) {
        if (subcribeId === uid) {
          callback(data)
          fired = true
        }
      } else {
        callback(data)
        fired = true
      }
      if (!fired || !once) {
        rest.push(member)
      }
    })
    if (rest.length === 0) {
      delete this.events[method]
      return true
    }
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
