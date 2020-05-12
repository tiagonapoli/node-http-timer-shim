# @tiagonapoli/http-timer-shim

[![Version](https://img.shields.io/npm/v/@tiagonapoli/http-timer-shim.svg)](https://npmjs.org/package/@tiagonapoli/http-timer-shim)

This simple package was built on top of [@szmarczak/http-timer](https://github.com/szmarczak/http-timer).

Unfortunately, [axios](https://github.com/axios/axios), unlike [got](https://github.com/sindresorhus/got), doesn't have request timings. I'm stuck with axios in some projects, so I did this shim wrapping `http[s]` request method and adding timers to them.

## Install

```sh
$ yarn add @tiagonapoli/http-timers-shim
```

## Usage

On your application entrypoint add the following:

```
import { wrapHttpAndHttps } "@tiagonapoli/http-timer-shim"

wrapHttpAndHttps()
```

This package also reexport typings from `@szmarczak/http-timer`:

- `ClientRequestWithTimings`
- `IncomingMessageWithTimings`

This way you can cast http's `ClientRequest` and `IncomingMessage`.
