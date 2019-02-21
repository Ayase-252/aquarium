import BotConfig from '../bot.config'
import Bot from './bot/bot'
import { startSystemGreetingSrv } from './services/start-system-greeting'
import { createMessageRelayService } from './services/message-relay'
import { createHttpServer } from './server/server'

const bot = new Bot({
  token: BotConfig.authorization_token,
  polling: true,
  isUseProxy: true
})

bot.dispatch('start', startSystemGreetingSrv)

const server = createHttpServer()
server.listen(9000)

bot.dispatch('startLink', ({ chatId, bot }) => {
  const msgRelaySrv = createMessageRelayService({
    bot,
    processor: ({ msg }) => msg,
    chatId: chatId
  })
  server.registerService({
    name: 'test',
    handler: msgRelaySrv
  })
})
