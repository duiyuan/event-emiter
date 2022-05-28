// global.window = global

import EventEmiter from '../src/index'

/**
 * Dummy test
 */
describe('event-emiter test suite', () => {
  const payload = {}
  it('ee.once(event, callback): event bind once, but trigger every time', () => {
    const ee = new EventEmiter()
    const name = 'custom_event'
    let count = 0
    ee.on(name, (data) => {
      expect(data === count).toBeTruthy()
      count += 1
    })
    for (let i = 0; i < 2; i += 1) {
      ee.emit(name, i)
    }
  })

  it('ee.once(event, callback): one-time event which remove after trigger', () => {
    const ee = new EventEmiter()
    const name = 'custom_once_event'
    ee.once(name, (data) => {
      expect(data === payload).toBeTruthy()
    })
    expect(ee.events[name].length).toBe(1)
    ee.emit(name, payload)
  })

  it('ee.off(event)', () => {
    const ee = new EventEmiter()
    const name = 'custom_once_event'
    const callback = (data: any) => {
      expect(data === payload).toBeTruthy()
    }
    ee.on(name, callback)
    expect(ee.events[name].length).toBe(1)
    ee.off(name, callback)
    expect(ee.events[name].length).toBe(0)
  })

  it('ee.removeListener(event)', () => {
    const ee = new EventEmiter()
    const name = 'custom_event'

    let i = 0
    let max = 10
    while (i < 10) {
      ee.on(name, (data: any) => {
        expect(data === payload).toBeTruthy()
      })
      i += 1
    }

    expect(ee.events[name].length).toBe(max)
    ee.removeListener(name)
    expect(ee.events[name].length).toBe(0)
  })

  it('ee.removeAllListener()', () => {
    const ee = new EventEmiter()
    const name = 'custom_event'

    let i = 0
    let max = 10
    while (i < 10) {
      ee.on(name, (data: any) => {
        expect(data === payload).toBeTruthy()
      })
      i += 1
    }

    expect(ee.events[name].length).toBe(max)
    ee.removeAllListener()
    expect(Object.keys(ee.events)).toHaveLength(0)
  })

  it('ee.on(event, callback).off()', () => {
    const ee = new EventEmiter()
    const name = 'custom_event'

    const unbind = ee.on(name, (data: any) => {
      expect(data === payload).toBeTruthy()
    })

    expect(ee.events[name]).toHaveLength(1)
    unbind()
    expect(ee.events[name]).toHaveLength(0)
  })

  it('ee.emit("unexpected_event") got boolean result', () => {
    const ee = new EventEmiter()
    const name = 'custom_event'

    ee.on(name, (data: any) => {
      expect(data === payload).toBeTruthy()
    })

    expect(ee.emit(name, payload)).toBe(true)
    expect(ee.emit(name + '_expected', payload)).toBe(false)
  })
})
