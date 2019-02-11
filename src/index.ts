import BotConfig from './bot.config'
import Bot from './bot'
import { startSystemGreetingSrv } from './services/start-system-greeting';


const bot = new Bot({
  token: BotConfig.authorization_token,
  polling: true,
  isUseProxy: true
})

bot.dispatch(/\/start/, startSystemGreetingSrv)
