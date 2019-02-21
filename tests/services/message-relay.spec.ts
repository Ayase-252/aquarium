import TelegramBot from 'node-telegram-bot-api'
import { createMessageRelayService } from '../../src/services/message-relay'
jest.mock('node-telegram-bot-api')

describe('MessageRelayService', () => {
  it('should relay the message after manipulated by processor', () => {
    const telegramBot = new TelegramBot('12345')
    const messageRelaySrv = createMessageRelayService({
      processor: ({ message }) => `received: ${message}`,
      bot: telegramBot,
      chatId: '123456'
    })
    messageRelaySrv({ message: 'hello world' })
    expect(telegramBot.sendMessage).toBeCalledWith(
      '123456',
      'received: hello world'
    )
    messageRelaySrv({ message: 'one more time' })
    expect(telegramBot.sendMessage).toBeCalledWith(
      '123456',
      'received: one more time'
    )
  })
})
