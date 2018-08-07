/* eslint-disable max-nested-callbacks */
/* eslint-disable no-unused-expressions */

import { assert, expect } from 'chai'
import nock from 'nock'
import path from 'path'

import Client from '../src'
import { Entity, Conversation, RecastError, Response } from '../src/apis/resources'
import json from './resource/json'
import conversationJson from './resource/conversationJson'

const TOKEN = process.env.RECAST_TOKEN || 'FAKE_TOKEN'
const LANGUAGE = 'FR'
const BOT_SLUG = process.env.RECAST_BOT_SLUG || 'FAKE_BOT_SLUG'
const USER_SLUG = process.env.RECAST_USER_SLUG || 'FAKE_USER_SLUG'

describe('Client class', () => {

  // Instanciation

  it('it should be instanciable without token', () => {
    expect(new Client(null, LANGUAGE)).to.be.an.instanceof(Client)
  })

  it('it should be instanciable without language', () => {
    expect(new Client(TOKEN, null)).to.be.an.instanceof(Client)
  })

  it('should be instanciable without params', () => {
    expect(new Client()).to.be.an.instanceof(Client)
  })

  it('should be instanciable with basic params', () => {
    expect(new Client(TOKEN, LANGUAGE)).to.be.an.instanceof(Client)
    expect(new Client(TOKEN, LANGUAGE).train).to.be.undefined
  })

  it('should be instanciable all params', () => {
    expect(new Client(TOKEN, LANGUAGE, USER_SLUG, BOT_SLUG)).to.be.an.instanceof(Client)
    expect(new Client(TOKEN, LANGUAGE, USER_SLUG, BOT_SLUG).train).to.not.be.undefined
  })

  // Attribute

  it('should have attributes', () => {
    const client = new Client(TOKEN, LANGUAGE)

    expect(client.connect).to.be.an.instanceof(Client.connect)
    expect(client.request).to.be.an.instanceof(Client.request)

    assert.throws(() => { Client() }, TypeError, 'Cannot call a class as a function')
  })

  // Methods

  const client = new Client(TOKEN)

  describe('textRequest', () => {
    nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(200, json)

    nock('https://api.recast.ai')
      .post('/v2/request')
      .once()
      .reply(404, 'invalid parameter')

    it('should perform a text request', done => {
      client.request.analyseText('Hello world')
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('should fail if no token', (done) => {
      const clientWithoutToken = new Client()
      clientWithoutToken.request.analyseText('text')
        .catch(err => {
          assert.equal(err.message, 'Parameter token is missing')
          done()
        })
    })

    it('should return an error on 404', done => {
      client.request.analyseText('Hello world')
        .catch(() => {
          done()
        })
    })
  })

  describe('textConversation', () => {
    nock('https://api.recast.ai')
      .post('/v2/converse')
      .once()
      .reply(200, json)

    nock('https://api.recast.ai')
      .post('/v2/converse')
      .once()
      .reply(404, 'invalid parameter')

    it('should performs a converse request', done => {
      client.request.converseText('Hello world')
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('should fail if no token', done => {
      const clientWithoutToken = new Client()
      clientWithoutToken.request.converseText('text')
        .catch(err => {
          assert.equal(err.message, 'Parameter token is missing')
          done()
        })
    })
  })
})

describe('Response class', () => {

  it('should be instanciable', () => {
    expect(new Response(json.results)).to.be.an.instanceof(Response)
  })

  it('should have attributes', () => {
    const response = new Response(json.results)

    assert.equal(response.uuid, json.results.uuid)
    assert.equal(response.source, json.results.source)
    assert.equal(response.act, json.results.act)
    assert.equal(response.type, json.results.type)
    expect(response.intents).to.be.an.instanceof(Array)
    assert.equal(response.sentiment, json.results.sentiment)
    expect(response.entities).to.be.an.instanceof(Object)
    expect(response.entities.action).to.be.an.instanceof(Array)
    expect(response.entities.action[0]).to.be.an.instanceof(Object)
    assert.equal(response.language, json.results.language)
    assert.equal(response.version, json.results.version)
    assert.equal(response.timestamp, json.results.timestamp)
    assert.equal(Object.keys(response.entities).length, 3)
  })

  it('should have methods', () => {
    const response = new Response(json.results)

    assert.equal(response.intent(), response.intents[0])
    assert.equal(response.all('location').length, 2)
    assert.equal(response.get('location').raw, 'London')

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

    assert.throws(() => { Response() }, TypeError, 'Cannot call a class as a function')
  })
})

describe('Entity class', () => {
  const data1 = { person: 1, number: 'singular', gender: 'unkown', raw: 'me' }
  const data2 = { value: 'asparagus', raw: 'asparagus' }

  it('should be instanciable', () => {
    expect(new Entity('ingredient', data2)).to.be.an.instanceof(Entity)
  })

  it('should have attributes', () => {
    const testEntity1 = new Entity('person', data1)
    const testEntity2 = new Entity('ingredient', data2)

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

    assert.throws(() => { Entity() }, TypeError, 'Cannot call a class as a function')
  })
})

describe('RecastError', () => {
  it('should throw an error', () => {
    assert.throws(() => { RecastError() }, TypeError, 'Cannot call a class as a function')
  })
})

describe('Conversation class', () => {
  it('should be instanciable', () => {
    expect(new Conversation(conversationJson)).to.be.an.instanceof(Conversation)
  })

  it('should have attributes', () => {
    const converse = new Conversation(conversationJson.results)
    const results = conversationJson.results

    assert.equal(converse.uuid, results.uuid)
    assert.equal(converse.source, results.source)
    assert.equal(converse.replies, results.replies)
    assert.equal(converse.action, results.action)
    assert.equal(converse.nextActions, results.next_actions)
    assert.equal(converse.intents, results.intents)
    assert.equal(converse.conversationToken, results.conversation_token)
    assert.equal(converse.language, results.language)
    assert.equal(converse.timestamp, results.timestamp)
    assert.equal(converse.status, results.status)
  })

  it('should have methods', () => {
    const converse = new Conversation(conversationJson.results)
    const results = conversationJson.results

    assert.equal(converse.reply(), results.replies[0])
    assert.equal(converse.nextAction(), results.next_actions[0])
    assert.equal(converse.joinedReplies(), results.replies.join(' '))
    assert.equal(converse.joinedReplies('\n'), results.replies.join('\n'))
    assert.equal(converse.getMemory(), results.memory)
    assert.equal(converse.getMemory('lieu'), results.memory.lieu)

    expect(converse).to.have.property('setMemory')
    expect(converse).to.have.property('resetMemory')
    expect(converse).to.have.property('resetConversation')
  })
})

describe('Train class', () => {
  const client = new Client(TOKEN, LANGUAGE, USER_SLUG, BOT_SLUG)
  describe('Bots api', () => {
    nock('https://api.recast.ai')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}`)
      .once()
      .reply(200, 'success')

    nock('https://api.recast.ai')
      .put(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}`, { name: 'foo' })
      .once()
      .reply(200, {})

    it('should get a bot', done => {
      client.train.bots.get()
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('should update a bot', done => {
      client.train.bots.update({ name: 'foo' })
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })
  })

  describe('Entities api', () => {
    nock('https://api.recast.ai')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/entities`)
      .once()
      .reply(200, 'success')

    nock('https://api.recast.ai')
      .get('/v2/entities')
      .once()
      .reply(200, 'success')

    nock('https://api.recast.ai')
      .post('/v2/entities', { slug: 'foo' })
      .once()
      .reply(200, {})

    it('should get a bot entities', done => {
      client.train.entities.list()
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('should get public entities', done => {
      client.train.entities.listPublic()
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('should create an entitiy', done => {
      client.train.entities.create({ slug: 'foo' })
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })
  })

  describe('Gazettes api', () => {
    const slug = 'myGazette'
    const gazetteSlug = slug
    const synonymSlug = 'mySynonym'
    const data = { slug: 'myGazette' }

    nock('https://api.recast.ai')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/entities`)
      .once().reply(200, 'success')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes`)
      .once().reply(200, 'success')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/logs/${slug}`)
      .once().reply(200, 'success')
      .delete(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/logs/${slug}`)
      .once().reply(200, 'success')
      .post(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes`, data)
      .once().reply(200, 'success')
      .put(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes`, data)
      .once().reply(200, 'success')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${slug}/synonyms`)
      .once().reply(200, 'success')
      .get(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`)
      .once().reply(200, 'success')
      .post(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${slug}/synonyms`, data)
      .once().reply(200, 'success')
      .post(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${slug}/synonyms/bulk_create`, [data])
      .once().reply(200, 'success')
      .put(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`, data)
      .once().reply(200, 'success')
      .delete(`/v2/users/${USER_SLUG}/bots/${BOT_SLUG}/gazettes/${gazetteSlug}/synonyms/${synonymSlug}`)
      .once().reply(200, 'success')

    it('Should list gazettes', done => {
      client.train.gazettes.list()
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should get gazette by slug', done => {
      client.train.gazettes.getBySlug(slug)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should delete gazette by slug', done => {
      client.train.gazettes.deleteBySlug(slug)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should create a gazette', done => {
      client.train.gazettes.create(data)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should update a gazette', done => {
      client.train.gazettes.update(data)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should list synonyms of a gazette', done => {
      client.train.gazettes.listSynonyms(slug)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should get a synonym of a gazette', done => {
      client.train.gazettes.getSynonymBySlug(gazetteSlug, synonymSlug)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should create one synonym', done => {
      client.train.gazettes.createOneSynonym(slug, data)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should bulk create synonyms', done => {
      client.train.gazettes.createBulkSynonyms(slug, [data])
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should update a synonym by slug', done => {
      client.train.gazettes.updateSynonymBySlug(gazetteSlug, synonymSlug, data)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })

    it('Should delete a synonym by slug', done => {
      client.train.gazettes.deleteSynonymBySlug(gazetteSlug, synonymSlug)
        .then(res => {
          assert.equal(res.status, 200)
          done()
        })
    })
  })
})
