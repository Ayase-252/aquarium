import { BotCallbackType } from "../bot";

export const startSystemGreetingSrv:BotCallbackType = ({chatId, matches, bot}) => {
  bot.sendMessage(chatId, 'Hello, your Aquarium System is started')
}

