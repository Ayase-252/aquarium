import TelegramBot from 'node-telegram-bot-api'
import { HandlerType } from '../server/server'

export const createMessageRelayService = ({
  processor,
  bot,
  chatId
}: {
  processor: HandlerType
  bot: TelegramBot
  chatId: number | string
}): HandlerType => {
  return (req): string => {
    const res = processor(req)
    bot.sendMessage(chatId, res)
    return res
  }
}
