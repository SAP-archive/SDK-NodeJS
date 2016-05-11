const recast = require('../lib/index')
const assert = require('chai').assert
const expect = require('chai').expect
const _ = require('lodash')

const TOKEN = process.env.RECAST_TOKEN

describe('Client class', () => {
  let testClient = new recast.Client(TOKEN)

  it ('should be instanciable', () => {
    expect(testClient).to.be.an.instanceof(recast.Client)
  })

  it ('should have attributes', () => {
    assert.equal(testClient.token, TOKEN)
  })

  it ('should perform a text request', (done) => {
    testClient.textRequest('Hello world', (response) => {
      assert.equal(response.status, 200)
      done()
    })
  })

  // Don't pass because the timeout is too short
  // it ('should perform a voice request', (done) => {
  //   testClient.fileRequest('/Users/jhoudan/Desktop/Recast/SDK-NodeJs/spec/resource/test.wav', (response) => {
  //     assert.equal(response.status, 200)
  //     done()
  //   })
  // })
})

describe('Response class', () => {
  let testClient = new recast.Client(TOKEN)
  let rawValue = {
    results:
      { source: 'Hello',
        intents: [ 'hello-greetings', 'test' ],
        sentences: [],
        version: '0.1.4',
        timestamp: '2016-05-11T12:14:53+02:00',
        status: 200
      },
      message: 'This is an instanciated response.'
  }

  it ('should be instanciable', () => {
    expect(new recast.Response(rawValue)).to.be.an.instanceof(recast.Response)
  })

  it ('should have attributes', () => {
    let testResponse = new recast.Response(rawValue)

    assert.equal(testResponse.status, 200)
    assert.equal(testResponse.version, rawValue.results.version)
    assert.equal(testResponse.source, rawValue.results.source)
    assert.equal(testResponse.timestamp, rawValue.results.timestamp)
    assert.equal(_.isEqual(testResponse.intents, ['hello-greetings', 'test']), true)
    assert.equal(_.isEqual(testResponse.raw, rawValue), true)
  })

  it ('should have methods', () => {
    let testResponse = new recast.Response(rawValue)

    assert.equal(testResponse.intent(), 'hello-greetings')
    assert.equal(testResponse.intent(), testResponse.intents[0])
    // get need to be tested
    // all need to be tested
  })
})

describe('Sentence class', () => {
  let rawValue = {
    source: 'This is a test',
    type: 'command',
    action: 'test',
    agent: null,
    polarity: 'positive',
    entities: []
  }

  it ('should be instanciable', () => {
    expect(new recast.Sentence(rawValue)).to.be.an.instanceof(recast.Sentence)
  })

  it ('should have attributes', () => {
    let testSentence = new recast.Sentence(rawValue)

    assert.equal(testSentence.source, 'This is a test')
    assert.equal(testSentence.type, 'command')
    assert.equal(testSentence.action, 'test')
    assert.equal(testSentence.agent, null)
    assert.equal(testSentence.polarity, 'positive')
  })
})

describe('Entity class', () => {
  let data1 = { person: 1, number: 'singular', gender: 'unkown', raw: 'me' }
  let data2 = { value: 'asparagus', raw: 'asparagus' }

  it ('should be instanciable', () => {
    expect(new recast.Entity('ingredient', data2)).to.be.an.instanceof(recast.Entity)
  })

  it ('should have attributes', () => {
    let testEntity1 = new recast.Entity('person', data1)
    let testEntity2 = new recast.Entity('ingredient', data2)

    // Test on first Entity
    assert.equal(testEntity1.name, 'person')
    assert.equal(testEntity1.person, data1.person)
    assert.equal(testEntity1.number, data1.number)
    assert.equal(testEntity1.gender, data1.gender)
    assert.equal(testEntity1.raw, data1.raw)
    // Test on second Entity
    assert.equal(testEntity2.name, 'ingredient')
    assert.equal(testEntity2.value, data2.value)
    assert.equal(testEntity2.raw, data2.raw)
  })
})
