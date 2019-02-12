import Bot from '../src/bot'

const sendTextMessage = (
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

describe('dispatch', () => {
  let bot: Bot
  beforeEach(() => {
    bot = new Bot({
      token: '123455',
      polling: false,
      isUseProxy: false
    })
  })
  it('should call handler proper arguments', () => {
    const spy = jest.fn()
    const chatId = 12345
    bot.dispatch('hello', spy)
    sendTextMessage(bot, { chatId, text: '/hello h' })
    expect(spy).toBeCalledWith({ chatId, params: ['h'], bot: bot._bot })
  })
  it('should call handler with empty arguments array', () => {
    const spy = jest.fn()
    const chatId = 12345
    bot.dispatch('hello', spy)
    sendTextMessage(bot, { chatId, text: '/hello' })
    expect(spy).toBeCalledWith({ chatId, params: [], bot: bot._bot })
  })
  it('should not invoke with irrelevant handler', () => {
    const spy = jest.fn()
    const chatId = 12345
    bot.dispatch('no', spy)
    sendTextMessage(bot, { chatId, text: '/hello' })
    expect(spy).not.toBeCalled()
  })
})
