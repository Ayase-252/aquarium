import { BotCallbackType } from '../bot/bot'

export const startSystemGreetingSrv: BotCallbackType = ({
  chatId,
  params,
  bot
}) => {
  bot.sendMessage(chatId, 'Hello, your Aquarium System is started')
}
