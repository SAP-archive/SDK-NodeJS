const assert = require('chai').assert
const expect = require('chai').expect
const request = require('superagent')
const nock = require('nock')
const _ = require('lodash')

const recast = require('../lib/index')
const json = require('./resource/json.js')

const TOKEN = process.env.RECAST_TOKEN || 'FAKE_TOKEN'
const LANGUAGE = 'FR'


describe('Client class', () => {

  // Instanciation

  it ('it should be instanciable without token', () => {
    expect(new recast.Client(null, LANGUAGE)).to.be.an.instanceof(recast.Client)
  })

  it ('it should be instanciable without language', () => {
    expect(new recast.Client(TOKEN, null)).to.be.an.instanceof(recast.Client)
  })

  it ('should be instanciable without params', () => {
    expect(new recast.Client()).to.be.an.instanceof(recast.Client)
  })

  it ('should be instanciable with all params', () => {
    expect(new recast.Client(TOKEN, LANGUAGE)).to.be.an.instanceof(recast.Client)
  })

  // Attribute

  it ('should have attributes', () => {
    const client = new recast.Client(TOKEN, LANGUAGE)

    assert.equal(client.token, TOKEN)
    assert.equal(client.language, LANGUAGE)

    assert.throws(() => { recast.Client() }, TypeError, 'Cannot call a class as a function')
  })

  // Methods

  const client = new recast.Client(TOKEN)

  describe('textRequest', () => {
    const apiNockedSuccess = nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(200, json)

    const apiNockedError = nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(404, 'invalid parameter')

    it ('should perform a text request', done => {
      client.textRequest('Hello world', (err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    })

    it ('should fail if no token', (done) => {
      let clientWithoutToken = new recast.Client()
      clientWithoutToken.textRequest("text", (err, res) => {
        expect(err).to.be.an.instanceof(Error)
        assert.equal(err.message, 'Token is missing')
        done()
      })
    })

    it ('should return an error on 404', done => {
      client.textRequest('Hello world', (err, res) => {
        assert.equal(res.status, 404)
        done()
      }, { language: 'fr' })
    })
  })

  describe('fileRequest', () => {
    const apiNockedSuccess = nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(200, json)

    const apiNockedError = nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(404, 'invalid parameter')

    it ('should perform a voice request', function(done) {
      this.timeout(15000)
      client.fileRequest(__dirname + '/resource/test.wav', (err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    })

    it ('should return an error on 404', done => {
      client.fileRequest('spec/resource/test.wav', (err, res) => {
        assert.equal(res.status, 404)
        done()
      }, { language: 'fr' })
    })

    it ('should perform a voice request', function(done) {
      let clientWithoutToken = new recast.Client()
      clientWithoutToken.fileRequest(__dirname + '/resource/test.wav', (err, res) => {
        expect(err).to.be.an.instanceof(Error)
        assert.equal(err.message, 'Token is missing')
        done()
      })
    })
  })
})

describe('Response class', () => {

  it ('should be instanciable', () => {
    expect(new recast.Response(json)).to.be.an.instanceof(recast.Response)
  })

  it ('should have attributes', () => {
    const response = new recast.Response(json)

    assert.equal(response.act, json.act)
    assert.equal(response.type, json.type)
    assert.equal(response.source, json.source)
    expect(response.intents).to.be.an.instanceof(Array)
    expect(response.intents[0]).to.be.an.instanceof(recast.Intent)
    assert.equal(response.sentiment, json.sentiment)
    expect(response.entities).to.be.an.instanceof(Array)
    expect(response.entities[0]).to.be.an.instanceof(recast.Entity)
    assert.equal(response.language, json.language)
    assert.equal(response.version, json.version)
    assert.equal(response.timestamp, json.timestamp)
    assert.equal(response.entities.length, 4)
  })

  it ('should have methods', () => {
    const response = new recast.Response(json)

    assert.equal(response.intent(), response.intents[0])
    assert.equal(response.all('location').length, 2)
    assert.equal(response.get('location').name, 'location')

    assert.equal(response.isAssert(), false)
    assert.equal(response.isCommand(), false)
    assert.equal(response.isWhQuery(), true)
    assert.equal(response.isYnQuery(), false)
    assert.equal(response.isAbbreviation(), false)
    assert.equal(response.isEntity(), false)
    assert.equal(response.isDescription(), true)
    assert.equal(response.isHuman(), false)
    assert.equal(response.isLocation(), false)
    assert.equal(response.isNumber(), false)
    assert.equal(response.isVPositive(), false)
    assert.equal(response.isPositive(), false)
    assert.equal(response.isNeutral(), true)
    assert.equal(response.isNegative(), false)
    assert.equal(response.isVNegative(), false)

    assert.throws(() => { recast.Response() }, TypeError, 'Cannot call a class as a function')
  })
})

describe('Intent class', () => {
  let data = { name: 'weather', confidence: 0.89 }

  it ('should be instanciable', () => {
    expect(new recast.Intent(data)).to.be.an.instanceof(recast.Intent)
  })

  it ('should have attributes', () => {
    let testIntent = new recast.Intent(data)

    assert.equal(testIntent.name, data.name)
    assert.equal(testIntent.confidence, data.confidence)

    assert.throws(() => { recast.Intent() }, TypeError, 'Cannot call a class as a function')
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
