import { Sentence } from './sentence'

export class Response {

  constructor (response) {
    this.raw = response
    response = response.results
    this.source = response.source
    this.intents = response.intents
    this.language = response.language
    this.sentences = response.sentences.map(sentence => new Sentence(sentence))
    this.version = response.version
    this.timestamp = response.timestamp
    this.status = response.status
  }

  /**
   * Returns the first Intent if there is one
   * @returns {Sentence}: returns the first Intent or null
   */
  intent () {
    return (this.intents) ? this.intents[0] : null
  }

  /**
   * Returns the first Sentence if there is one
   * @returns {Sentence}: returns the first Sentence or null
   */
  sentence () {
    return (this.sentences) ? this.sentences[0] : null
  }

  /**
   * Returns the first Entity whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Entity}: returns the first entity that matches - name -
   */
  get (name) {
    let response

    this.sentences.forEach(sentence => {
      sentence.entities.forEach(entity => {
        if (entity.name === name && !response) {
          response = entity
        }
      })
    })
    return response
  }

  /**
   * Returns all the entities whose name matches the parameter
   * @param {String} name: the entity's name
   * @returns {Array}: returns an array of Entity, or null
   */
  all (name) {
    const response = []

    this.sentences.forEach(sentence => {
      sentence.entities.forEach(entity => {
        if (entity.name === name) {
          response.push(entity)
        }
      })
    })
    return response
  }
}
