import TelegramBot from 'node-telegram-bot-api'
const SocksProxyAgent = require('socks-proxy-agent')

const proxyAgent = new SocksProxyAgent('socks5://127.0.0.1:1080', true)
type BotOptionsType = {
  isUseProxy?: boolean
  token: string
  polling: boolean
}

export type BotCallbackType = (args: {
  chatId: number
  params: string[]
  bot: TelegramBot
}) => void

class Bot {
  _bot: TelegramBot
  constructor({ token, polling, isUseProxy = false }: BotOptionsType) {
    const baseOpt = {
      polling
    }
    const opt = isUseProxy
      ? { ...baseOpt, request: { agent: proxyAgent } }
      : baseOpt
    // missing url or uri parameter in request, which should be unnecessary
    this._bot = new TelegramBot(token, opt as any)
  }
  dispatch(command: string, handler: BotCallbackType) {
    const reg = new RegExp(`\/${command}(?: (.+))?`)
    this._bot.onText(reg, (message, matches) => {
      const chatId = message.chat.id
      const params = matches && matches[1] ? matches[1].split(' ') : []
      handler({
        chatId,
        params,
        bot: this._bot
      })
    })
  }
}

export default Bot
