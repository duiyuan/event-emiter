# @dioxide-js/event-emiter

Simple event emiter.

## Install

```
$ yarn add @dioxide-js/event-emiter
```

### Usage

```
import EventEmiter from '@dioxide-js/event-emiter'

const ee = new EventEmiter()
const subid = "abc-def-123"

// listen event which will tigger every time
ee.on("custom_event", (data) => {
  console.log("tigger every time")
}, {once: false})
// listen event which will tigger every time, and the callback only matched subscribeId will invoke
ee.on("custom_event", (data) => {
  console.log("trigger every time when event emitted with matched subscribeId:abc-def-123, eg. ee.emit('custom_event', {}, subid)")
}, {once: false, subscribeId: subid})


// listen event which will tigger only once
ee.once("custom_event_once", (data) => {})
ee.on("custom_event_once", (data) => {}, {once: true})


ee.emit('custom_event', {message: "hi"})
ee.emit('custom_event', {message: "hi"}, subid)
```
