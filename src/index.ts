import http from 'http'
import https from 'https'

import timer from '@szmarczak/http-timer'
import shimmer from 'shimmer'

export { ClientRequestWithTimings, IncomingMessageWithTimings } from '@szmarczak/http-timer'

export const wrapHttpAndHttps = () => {
  shimmer.massWrap([http, https], ['request'], function (original) {
    return function (...args: any[]) {
      const request = original.apply(this, args as Parameters<typeof http.request>)
      timer(request)
      return request
    }
  })
}
