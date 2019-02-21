import _req from 'supertest'
import { createHttpServer, HttpServer } from '../../src/server/server'

describe('HttpServer', () => {
  describe('/services/', () => {
    const requestService = async (
      server: HttpServer,
      app: any,
      serviceName: string,
      serviceHandler: any,
      data: any
    ) => {
      server.registerService({ name: serviceName, handler: serviceHandler })
      return await _req(app)
        .post(`/services/${serviceName}`)
        .send(data)
    }
    const testApp = {} as any
    beforeEach(() => {
      testApp.httpServer = createHttpServer()
      testApp.app = testApp.httpServer.listen(3000)
    })
    afterEach(done => {
      testApp.app.close(done)
    })
    it('should relay the message to handler with POST request', async () => {
      const { httpServer, app } = testApp

      const testHandler = jest.fn()
      const testData = { message: 'hello world' }
      let resp = await requestService(
        httpServer,
        app,
        'test',
        testHandler,
        testData
      )
      expect(resp.status).toEqual(200)
      expect(testHandler).toHaveBeenCalledWith(testData)

      const anotherHandler = jest.fn()
      const anotherData = { num: 123, param: ['123', 452, 'test'] }
      resp = await requestService(
        httpServer,
        app,
        'test',
        anotherHandler,
        anotherData
      )
      expect(resp.status).toEqual(200)
      expect(anotherHandler).toHaveBeenCalledWith(anotherData)
    })
    it('should send the returned text by handler as response', async () => {
      const { httpServer, app } = testApp

      const handlerWithReturnVal = jest.fn().mockReturnValue('hello world')
      let resp = await requestService(
        httpServer,
        app,
        'return',
        handlerWithReturnVal,
        {}
      )
      expect(resp.text).toEqual('hello world')
    })
  })
})
