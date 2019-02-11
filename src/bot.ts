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
  matches: RegExpMatchArray | null
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
  dispatch(reg: RegExp, handler: BotCallbackType) {
    this._bot.onText(reg, (message, matches) => {
      const chatId = message.chat.id
      handler({
        chatId,
        matches,
        bot: this._bot
      })
    })
  }
}

export default Bot
