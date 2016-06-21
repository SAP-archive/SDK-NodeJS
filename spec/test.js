const recast = require('../lib/index')
const assert = require('chai').assert
const expect = require('chai').expect
const _ = require('lodash')

const TOKEN = process.env.RECAST_TOKEN

describe('Client class', () => {
  let testClient = new recast.Client(TOKEN)

  it ('should be instanciable without language', () => {
    const clientWithoutLanguage= new recast.Client("TOKEN")
    expect(clientWithoutLanguage).to.be.an.instanceof(recast.Client)
  })

  it ('should be instanciable without token', () => {
    const clientWithoutToken = new recast.Client()
    expect(clientWithoutToken).to.be.an.instanceof(recast.Client)
  })

  it ('should be instanciable with all params', () => {
    let testClient2 = new recast.Client(TOKEN, "EN")
    expect(testClient).to.be.an.instanceof(recast.Client)
  })

  it ('should have attributes', () => {
    assert.equal(testClient.token, TOKEN)
  })

  it ('should perform a text request', (done) => {
    testClient.textRequest('Hello world', (res, err) => {
      assert.equal(res.status, 200)
      done()
    })
  })

  it ('textRequest should fail if no token', (done) => {
    let clientWithoutToken = new recast.Client()
    clientWithoutToken.textRequest("text", (res, err) => {
      expect(err).to.be.an.instanceof(Error)
      done()
    })
  }) 

  it ('should accept french language', done => {
    testClient.textRequest('Bonjour', (res, err) => {
      assert.equal(res.language, 'fr')
      done()
    }, {language: 'fr'})
  })

  it ('should return a RecastError on invalid request', (done) => {
    testClient.textRequest('Hello world', (res, err) => {
      expect(err).to.be.a('Error')
      done()
    }, { token: 'invalid_token' })
  })

  it ('should perform a voice request', function(done) {
    this.timeout(15000)
    testClient.fileRequest(__dirname + '/resource/test.wav', (response, err) => {
      assert.equal(response.status, 200)
      done()
    })
  })
})

describe('Response class', () => {
  let testClient = new recast.Client(TOKEN)
  let rawValue = {
    results:
      { source: 'Give me some recipes with asparagus.',
        intents: [ 'recipe', 'test' ],
        sentences: [
          {
            source: 'Give me some recipes with asparagus.',
            type: 'command',
            action: 'give',
            agent: 'you',
            polarity: 'positive',
            entities: {
              pronoun: [
                { person: 1, number: "singular", gender: "unkown", raw: "me" },
                { person: 1, number: "singular", gender: "unkown", raw: "me" }
              ],
              ingredient: [{ value: "asparagus", raw: "asparagus" }]
            }
          }
        ],
        version: '0.1.4',
        timestamp: '2016-05-12T09:23:12+02:00',
        status: 200
      },
      message: 'Requests rendered with success.'
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
    assert.equal(_.isEqual(testResponse.intents, ['recipe', 'test']), true)
    assert.equal(_.isEqual(testResponse.raw, rawValue), true)
  })

  it ('should have methods', () => {
    let testResponse = new recast.Response(rawValue)
    let arrayEntities = []
    arrayEntities.push(new recast.Entity('pronoun', { person: 1, number: 'singular', gender: 'unkown', raw: 'me' }))
    arrayEntities.push(new recast.Entity('pronoun', { person: 1, number: 'singular', gender: 'unkown', raw: 'me' }))
    arrayEntities.push(new recast.Entity('ingredient', { value: 'asparagus', raw: 'asparagus' }))
    let slice = arrayEntities.slice(0, 2)

    assert.equal(testResponse.intent(), 'recipe')
    assert.equal(testResponse.intent(), testResponse.intents[0])
    assert.equal(_.isEqual(testResponse.sentence(), testResponse.sentences[0]), true)
    assert.equal(_.isEqual(testResponse.get('ingredient'), arrayEntities[2]), true)
    assert.equal(_.isEqual(testResponse.all('pronoun'), slice), true)
    assert.equal(testResponse.get('Invalid'), null)
    assert.equal(_.isEqual(testResponse.all('Invalid'), []), true)

    testResponse.sentences = null
    testResponse.intents = null
    assert.equal(testResponse.sentence(), null)
    assert.equal(testResponse.intent(), null)

    testClient.token = undefined
    assert.throws(() => { recast.Response() }, TypeError, 'Cannot call a class as a function')
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

    assert.throws(() => { recast.Sentence() }, TypeError, 'Cannot call a class as a function')
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

    assert.throws(() => { recast.Entity() }, TypeError, 'Cannot call a class as a function')
  })
})

describe('RecastError', () => {
  it ('should throw an error', () => {
    assert.throws(() => { recast.RecastError() }, TypeError, 'Cannot call a class as a function')
  })
})
