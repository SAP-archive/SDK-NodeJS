export default class Response {
  // attributs:
  // raw, source, intents, sentences, version, timestamp, etc...
  contructor() {
    // get the response of the request
    // init each attribut
    // create new Sentence instance
  }

  // Batteries of getter
  raw() {
    // returns the raw, unparsed response
  }

  source() {
    // returns the source Recast.AI processed
  }

  intents() {
    // returns all the matched intents
  }

  intent() {
    // returns the first matched intent
  }

  sentences() {
    // returns all the detected sentences
  }

  sentence() {
    // returns the first detected sentence
  }

  get(name) {
    // return the first entity that matched - name -
  }

  all(name) {
    // returns all the entities that matched - name -
  }

  version() {
    // returns the version of the JSON
  }

  timestamp() {
    // returns the timestamp at the end of the request
  }
}
