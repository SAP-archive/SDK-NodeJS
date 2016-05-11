import { Sentence } from './sentence'

export class Response {

  constructor (response) {
    this.raw = response
    response = response.results
    this.source = response.source
    this.intents = response.intents
    this.sentences = response.sentences.map(sentence => new Sentence(sentence))
    this.version = response.version
    this.timestamp = response.timestamp
    this.status = response.status
  }

  /*
    Returns the first intent if there is one
  */
  intent () {
    return (this.intents) ? this.intents[0] : null
  }

  /*
    Returns the first sentence if there is one
  */
  sentence () {
    return (this.sentences) ? this.sentences[0] : null
  }

  /*
    Returns the first entity whose name matches the parameter
    | Args |
      - name - String, the entity's name
    | Return |
      - An instance of Entity or undefined
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

  /*
    Returns all the entities whose name matches the parameter
    | Args |
      - name - String, the entity's name
    | Return |
      - An array of Entity's instances or an empty array
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
