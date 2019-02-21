import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'

type HandlerType = (req: {}) => string
type HandlerMapType = {
  [key: string]: HandlerType
}
const handlerMap: HandlerMapType = {}

const router = new Router()
router.post('/services/:name', (ctx, next) => {
  const { request } = ctx
  ctx.body = handlerMap[ctx.params['name']](request.body)
  ctx.status = 200
})

export class HttpServer extends Koa {
  constructor() {
    super()
  }
  registerService({ name, handler }: { name: string; handler: HandlerType }) {
    handlerMap[name] = handler
  }
}

export const createHttpServer = (): HttpServer => {
  const app = new HttpServer()
  app
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods())
  return app
}
