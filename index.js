const axios = require('axios')
const BotConfig = require('./bot.config.json')
const SocksProxyAgent = require('socks-proxy-agent')
const TelegramBot = require('node-telegram-bot-api')

const proxyAgent = new SocksProxyAgent('socks://127.0.0.1:1080', true)

const TOKEN = BotConfig.authorization_token

const bot = new TelegramBot(TOKEN, {
  polling: true,
  request: {
    agent: proxyAgent
  }
})

bot.onText(/\/echo (.+)/, (message, match) => {
  const chatId = message.chat.id
  const resp = match[1]

  bot.sendMessage(chatId, resp)
})

bot.on('message', (message) => {
  const chatId = message.chat.id
  bot.sendMessage(chatId, 'your message is committed')
})
