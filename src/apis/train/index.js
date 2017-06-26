import superagent from 'superagent'
import superagentProxy from 'superagent-proxy'
import superagentPromise from 'superagent-promise'

import constants from '../constants'
import { RecastError } from '../resources'

import Bots from './bots'
import Entities from './entities'
import Gazettes from './gazettes'
import Intents from './intents'
import Logs from './logs'

const agent = superagentPromise(superagentProxy(superagent), Promise)

export default class Train {

  constructor (token, language, userSlug, botSlug) {
    if (typeof userSlug !== 'string' || typeof botSlug !== 'string') {
      throw new RecastError('Train client must be initiated with a user slug and a bot slug')
    }

    this.token = token
    this.language = language
    this.userSlug = userSlug
    this.botSlug = botSlug

    this.bots = new Bots(this)
    this.entities = new Entities(this)
    this.gazettes = new Gazettes(this)
    this.intents = new Intents(this)
    this.logs = new Logs(this)
  }

  get = async (url, params = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (!token) { throw new RecastError('Parameter token is missing') }

    const request = agent.get(`${constants.TRAIN_ENDPOINT}${url}`)
      .query(params)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return request.send()
  }

  del = async (url, params = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (!token) { throw new RecastError('Parameter token is missing') }

    const request = agent.del(`${constants.TRAIN_ENDPOINT}${url}`)
      .query(params)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return request.send()
  }

  post = async (url, body = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (!token) { throw new RecastError('Parameter token is missing') }

    const request = agent.post(`${constants.TRAIN_ENDPOINT}${url}`)
      .send(body)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return request.send(body)
  }

  put = async (url, body = {}, options = {}) => {
    const token = options.token || this.token
    const proxy = options.proxy
    if (!token) { throw new RecastError('Parameter token is missing') }

    const request = agent.put(`${constants.TRAIN_ENDPOINT}${url}`)
      .send(body)
      .set('Authorization', `Token ${token}`)
    if (proxy) { request.proxy(proxy) }

    return request.send(body)
  }
}
