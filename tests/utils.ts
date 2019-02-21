import Bot from '../src/bot'

export const sendTextMessage = (
  bot: Bot,
  { chatId, text }: { chatId: number; text: string }
) => {
  bot._bot.processUpdate({
    message: {
      text,
      message_id: 12345,
      chat: { id: chatId, type: 'private' },
      date: 12345566
    },
    update_id: 123455
  })
}
