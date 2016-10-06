# Recast.AI - SDK Node.js

[logo]: https://github.com/RecastAI/SDK-NodeJs/blob/master/misc/logo-inline.png "Recast.AI"

![alt text][logo]

Recast.AI official SDK in Node.js

## Synospis

This module is a wrapper around the [Recast.AI](https://recast.ai) API, and allows you to:
* [build a bot](https://github.com/RecastAI/SDK-NodeJS/wiki/Build-your-bot)
* [analyze your text](https://github.com/RecastAI/SDK-NodeJS/wiki/Analyse-text)

## Installation

```bash
npm install --save recastai
```

## Documentation

You can find the full documentation [here](https://github.com/RecastAI/SDK-NodeJS/wiki).

## Specs

This module contains 5 classes, as follows:

* [Client](https://github.com/RecastAI/SDK-NodeJS/wiki/Class-Client) is the client allowing you to make requests.
* [Conversation](https://github.com/RecastAI/SDK-NodeJS/wiki/Class-Conversation) wraps the response from a call to [Recast.AI](https://recast.ai) API with the textConverse Client method.
* [Response](https://github.com/RecastAI/SDK-NodeJS/wiki/Class-Response) wraps the response from a call to [Recast.AI](https://recast.ai) API with the textRequest or fileRequest Client methods.
* [Entity](https://github.com/RecastAI/SDK-NodeJS/wiki/Class-Entity) represents an entity extracted from an input.
* [RecastError](https://github.com/RecastAI/SDK-NodeJS/wiki/Class-RecastError) is the error returned by the module.

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
