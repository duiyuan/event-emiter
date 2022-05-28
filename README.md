# @dioxide-js/event-emiter

Simple event emiter.

## Usage

#### ES Module

#### Install

```
$ yarn add @dioxide-js/event-emiter
```

```
import EventEmiter from '@dioxide-js/event-emiter'

const ee = new EventEmiter()

// listener event which will tigger every time
ee.on("custom_event", (data) => {})

// listener event which will tigger only once
ee.once("custom_event_once", (data) => {})

ee.emit('custom_event', {})
```
