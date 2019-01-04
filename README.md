<p align="center">
  <img src="https://cdn.cai.tools.sap/brand/sapcai/sap-cai-black.svg" />
</p>

| [Installation](#installation) | [Sample Projects](#sample-projects) | [Resources]( #resources) | [Getting Started on SAP Conversational AI]( #getting-started-with-sap-conversational-ai) | [License](#license) |
|---|---|---|---|---|
<div>
<a href="https://slack.cai.tools.sap">💬 Questions / Comments? Join the discussion on our community Slack channel!</a>
</div>

# SAP Conversational AI - SDK Node.js
SAP Conversational AI official SDK in Node.js

## Synospis

This module is a wrapper around the [SAP Conversational AI](https://cai.tools.sap/) [API](https://cai.tools.sap/docs/api-reference) API, and allows you to:
* [Analyse your text](https://github.com/SAPConversationalAI/SDK-NodeJS/wiki/Analyse-text)
* [Manage your conversation](https://github.com/SAPConversationalAI/SDK-NodeJS/wiki/Manage-your-conversation)
* [Receive and send messages](https://github.com/SAPConversationalAI/SDK-NodeJS/wiki/Receive-and-send-messages)

## Installation

Install the package using npm, as shown below:
```bash
npm install --save sapcai
```

You can now use the SDK in your code. All you need is your bot's token. In case you have enabled our versioning feature in the settings of your bot, you can refer to our [versioning documentation](https://cai.tools.sap/docs/concepts/versioning) to learn how to select the appropriate token for you versions and environments.

_Note:_ The `train` API needs to be initialized with the bot version. If versioning is not enabled for the bot, the default `v1` should be used. For more info see our documentation on [versioning](https://cai.tools.sap/docs/concepts/versioning).

#### ES5

Using the entire SDK:
```js
var sapcai = require('sapcai').default

var client = new sapcai('YOUR_TOKEN')
```

Extracting one single API:
```js
var sapcai = require('sapcai').default

var converse = new sapcai.converse('YOUR_TOKEN')
```

#### ES6

Using the entire SDK:
```js
import sapcai from 'sapcai'

const client = new sapcai('YOUR_TOKEN')
```

Extracting one single API:
```js
import { converse } from 'sapcai'

const clientConverse = new converse('YOUR_TOKEN')
```

## Sample projects

Check out our [NodeJS starter-kit](https://github.com/SAPConversationalAI/starter-NodeJS) for a usage example of the SDK.

## Resources
* [Bot Builder Guide](https://cai.tools.sap/docs) - Best practices and tips to use the SAP Conversational AI platform 
* [API Documentation](https://cai.tools.sap/docs/api-reference)
* [Your first bot](https://cai.tools.sap/blog/build-your-first-bot-with-recast-ai/) - Build your first bot with Bot Builder
* [Advanced chatbot tutorial(Moviebot)](https://cai.tools.sap/blog/nodejs-chatbot-movie-bot/) - Overview of how to get started building your bot's server

You can follow us on Twitter at [@sapcai](https://twitter.com/sapcai) for updates and releases.

## Getting started with SAP Conversational AI

We build products to help enterprises and developers have a better understanding of user inputs.

-   **NLP API**: a unique API for text processing, and augmented training.
-   **Bot Building Tools**: all you need to create smart bots powered by SAP Conversational AI's NLP API. Design even the most complex conversation flow, use all rich messaging formats and connect to external APIs and services.
-   **Bot Connector API**: standardizes the messaging format across all channels, letting you connect your bots to any channel in minutes.

Learn more about:

| [API Documentation](https://cai.tools.sap/docs/api-reference/) | [Discover the platform](https://cai.tools.sap/docs/create-your-bot) | [First bot tutorial](https://cai.tools.sap/blog/build-your-first-bot-with-recast-ai/) | [Advanced NodeJS tutorial](https://cai.tools.sap/blog/nodejs-chatbot-movie-bot/) | [Advanced Python tutorial](https://cai.tools.sap/blog/python-cryptobot/) |
|---|---|---|---|---|

## License

Copyright (c) [2019] [SAP Conversational AI](https://cai.tools.sap)

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
