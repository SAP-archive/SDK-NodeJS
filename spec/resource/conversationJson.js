module.exports = {
  results: {
    uuid: 'db4837b0-8359-4505-9678-c4081a6f2ad8',
    source: 'What is the weather in Paris ?',
    replies: [
      'Do you already have an account?',
      'This is a test?',
    ],
    action: {
      slug: 'murder',
      done: false,
      reply: 'do you already have an account?',
    },
    next_actions: [{
      slug: 'test',
      done: false,
      reply: 'This is a test?',
    }],
    memory:
    {
      victim: null,
      client: null,
      'mail-client': null,
      lieu: [],
    },
    entities: {},
    intents: [],
    conversation_token: '8641d38b059cde2826e3cdf2f9b00725',
    language: 'en',
    timestamp: '2016-10-04T15:26:11.876Z',
    status: 200,
  },
  message: 'Converses rendered with success',
}
