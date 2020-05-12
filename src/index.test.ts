import { ClientRequestWithTimings } from '@szmarczak/http-timer/dist/source'
import axios from 'axios'
import http from 'http'
import https from 'https'
import { IncomingMessageWithTimings, wrapHttpAndHttps } from './index'
wrapHttpAndHttps()

describe('native tests', () => {
  test('http request', (done) => {
    const req = http.request('http://www.google.com', (res) => {
      res.resume()
      res.once('end', () => {
        expect((res as IncomingMessageWithTimings).timings).toBeDefined()
        expect((req as ClientRequestWithTimings).timings).toBeDefined()
        done()
      })
    })

    req.end()
  })

  test('https request', (done) => {
    const req = https.request('https://www.google.com', (res) => {
      res.resume()
      res.once('end', () => {
        expect((res as IncomingMessageWithTimings).timings).toBeDefined()
        expect((req as ClientRequestWithTimings).timings).toBeDefined()
        done()
      })
    })

    req.end()
  })
})

describe('axios tests', () => {
  test('simple request', async () => {
    const res = await axios.get('http://www.google.com')
    expect((res.request as IncomingMessageWithTimings).timings).toBeDefined()
  })

  test('error request', async () => {
    try {
      await axios.get('http://localhost:9999')
    } catch (err) {
      expect((err.request._currentRequest as IncomingMessageWithTimings).timings).toBeDefined()
    }

    expect.assertions(1)
  })
})
