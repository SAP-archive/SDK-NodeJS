# Recast.AI - SDK Node.js

[logo]: https://github.com/RecastAI/SDK-NodeJs/blob/master/misc/logo-inline.png "Recast.AI"

![alt text][logo]

Recast.AI official SDK in Node.js

## Synospis

This module is a Node.js interface to the [Recast.AI](https://recast.ai) API. It allows you to make request to your bots

## Installation

```bash
npm install --save recastai
```
## Usage

```javascript
var recastai = require('recastai')

var client = new recastai.Client(YOUR_TOKEN, YOUR_LANGUAGE)

client.textRequest(YOUR_TEXT)
  .then(function(res) {
    var intent = res.intent()

    if (intent.slug === YOUR_INTENT) {
      // Do your code
    }
  }).catch(function(err) {
    // Handle error
  })
```

## Specs

### Classes

This module contains 4 classes, as follows:

* Client is the client allowing you to make requests.
* Response contains the response from [Recast.AI](https://recast.ai).
* Entity represents an entity of the response
* RecastError is the error returned by the module.

Don't hesitate to dive into the code, it's commented ;)

## class Client
The Client can be instanciated with a token and a language (both optional).

```javascript
var client = new recastai.Client(YOUR_TOKEN, YOUR_LANGUAGE)
```

__Your tokens:__

[token]: https://github.com/RecastAI/SDK-NodeJs/blob/master/misc/recast-ai-tokens.png "Tokens"

![alt text][token]

*Copy paste your request access token from your bot's settings.*

__Your language__
```javascript
var client = new recastai.Client(YOUR_TOKEN, 'en')
```
*The language is a lowercase 639-1 isocode.*

## Text Request

textRequest(text, options = { token: YOUR_TOKEN, language: YOUR_LANGUAGE, proxy: YOUR_PROXY_URL })

If you pass a token or a language in the options parameter, it will override your default client language or token.
You can pass a proxy url in the options if needed.

```javascript
client.textRequest(YOUR_TEXT)
  .then(function(res) => {
    // Do your code
  }).catch(function(err) => {
    // Handle error
  })
```

```javascript
// With optional parameters

client.textRequest(YOUR_TOKEN, YOUR_LANGUAGE)
  .then(function(res) => {
    // Do your code
  }).catch(function(err) => {
    // Handle error
  })
```

__If a language is provided:__ the language you've given is used for processing if your bot has expressions for it, else your bot's primary language is used.

__If no language is provided:__ the language of the text is detected and is used for processing if your bot has expressions for it, else your bot's primary language is used for processing.
## File Request

fileRequest(file, options = { token: YOUR_TOKEN, language: YOUR_LANGUAGE, proxy: YOUR_PROXY_URL })

If you pass a token or a language in the options parameter, it will override your default client language or token.
You can pass a proxy url in the options if needed.

__file format: .wav__

```javascript
client.fileRequest('myFile.wav')
  .then(function(res) => {
    // Do your code
  }).catch(function(err) => {
    // Handle error
  })
```

```javascript
// With optional parameters

client.fileRequest('myFile.wav', { token: YOUR_TOKEN, language: YOUR_LANGUAGE })
  .then(function(res) => {
    // Do your code
  }).catch(function(err) => {
    // Handle error
  })
```

__If a language is provided:__
Your bot's primary language is used for processing as we do not provide language detection for speech.

__If no language is provided:__
The language you've given is used for processing if your bot has expressions for it, else your bot's primary language is used

## class Response

The Response is generated after a call to either fileRequest or textRequest.

### Get the first detected intent

| Method        | Params | Return                    |
| ------------- |:------:| :-------------------------|
| intent()      |        | Object: the first detected intent |

```javascript
client.textRequest(YOUR_TEXT)
  .then(function(res) {

    var intent = res.intent()

    if (intent.slug === 'geetings' && intent.confidence > 0.7) {
      // Do your code
    }

  })
```

### Get one entity

| Method        | Params        | Return                    |
| ------------- |:-------------:| :-------------------------|
| get(name)     | name: String  | Entity: the first Entity matched  |


```javascript
client.textRequest(YOUR_TEXT)
  .then(function(res) {

    var location = res.get('location')

  })
```

### Get all entities matching name

| Method        | Params        | Return                    |
| ------------- |:-------------:| :-------------------------|
| all(name)     | name: String  | Array[Entity]: all the Entities matched  |

```javascript
client.textRequest(YOUR_TEXT)
  .then(function(res) {

    var locations = res.all('location')

  })
```

### Act helpers

| Method        | Params | Return                                       |
| ------------- |-------:| :--------------------------------------------|
| isAssert()    |        | Bool: whether or not the act is an assertion |
| isCommand()   |        | Bool: whether or not the act is a command    |
| isWhQuery()   |        | Bool: whether or not the act is a question   |
| isYnQuery()   |        | Bool: whether or not the act is a query      |

### Type helpers

| Method           | Params | Return                                                          |
| ---------------- |-------:| :---------------------------------------------------------------|
| isAbbreviation() |        | Bool: whether or not the sentence is asking for an abbreviation |
| isEntity()       |        | Bool: whether or not the sentence is asking for an entity       |
| isDescription()  |        | Bool: whether or not the sentence is asking for a description   |
| isHuman()        |        | Bool: whether or not the sentence is asking for a human         |
| isLocation()     |        | Bool: whether or not the sentence is asking for a location      |
| isNumber()       |        | Bool: whether or not the sentence is asking for a number        |

### Sentiment helpers

| Method        | Params | Return                                               |
| ------------- |-------:| :----------------------------------------------------|
| isVPositive() |        | Bool: whether or not the sentiment is very positive  |
| isPositive()  |        | Bool: whether or not the sentiment is positive       |
| isNeutral()   |        | Bool: whether or not the sentiment is neutral        |
| isNegative()  |        | Bool: whether or not the sentiment is negative       |
| isVNegative() |        | Bool: whether or not the sentiment is very negative  |

### Attributes

Each of the following methods corresponds to a Response attribute

| Attributes  | Type                                                |
| ----------- | :---------------------------------------------------|
| raw         | String: the raw unparsed json response              |
| uuid        | String: the uuid of the request                     |
| source      | String: the user input                              |
| intents     | Array[object]: all the matched intents              |
| act         | String: the act of the processed sentence           |
| type        | String: the type of the processed sentence          |
| sentiment   | String: the sentiment of the processed sentence     |
| entities    | Array[Entity]: the array of entities                |
| language    | String: the language of the input                   |
| version     | String: the version of the json                     |
| timestamp   | String: the timestamp at the end of the processing  |
| status      | String: the status of the response                  |

## class Entity

The Entity is generated by the Sentence constructor.

### Attributes

Each of the following methods corresponds to a Response attribute

| Attributes  | Description                                                   |
| ----------- |:--------------------------------------------------------------|
| name        | String: the name of the entity                                |
| raw         | String: the raw value extracted from the sentence             |
| confidence  | Float: the detection score between 0 and 100 excluded         |

In addition to those methods, more attributes are generated depending of the nature of the entity.
The full list can be found there: [man.recast.ai](https://man.recast.ai/#list-of-entities)

```javascript
client.textRequest(YOUR_TEXT)
  .then(function(res) {

    var location = res.get('location')

    console.log(location.raw)
    console.log(location.slug)

  })
```

## class RecastError

The Recast.AI Error is thrown when receiving an non-200 response from Recast.AI.

As it inherits from Error, it implements the default Error methods.

## More

You can view the whole API reference at [man.recast.ai](https://man.recast.ai).

## Author

Jérôme Houdan, jerome.houdan@recast.ai

You can follow us on Twitter at [@recastai](https://twitter.com/recastai) for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
