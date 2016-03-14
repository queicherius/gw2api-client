# gw2api-client

[![Build Status](https://img.shields.io/travis/gw2efficiency/gw2api-client.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/gw2api-client)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/gw2api-client/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/gw2api-client)

> Javascript wrapper for the official Guild Wars 2 API.

## Install

```
npm install gw2e-gw2api-client
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). 
Requires the [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) to work.

## Usage

**[For the full documentation on the available methods, please visit the wiki here.](https://github.com/gw2efficiency/gw2api-client/wiki)**

### Basic usage

```js
async function example () {

  // Get the constructor of a client
  const client = require('gw2e-gw2api-client')
  
  // Actually generate a API client
  let api = client()
  
  // Optional: Set the language of the client
  api.language('en')
  
  // Optional: Authenticate the client using an API key
  api.authenticate('my-secret-key')
  
  // Get the ids of all items
  let items = await api.items().ids()
  
  // Note: If you want to request e.g. multiple items with different languages
  // or API keys in *parallel*, you have to use *different* client instances
  // for that, since language and key are connected to the client instance
  async.parallel([
    () => client().language('en').items().all(),
    () => client().language('de').items().all()
  ])
  
}
```

### Error handling

You can wrap every call in a `try...catch` statement, catching all possible errors.

```js
try {
  let bank = await api.account().bank()
} catch (err) {
  console.log('Something went wrong. :(', err)
  // err.response is the last response object (e.g. err.response.status)
  // err.content is the parsed body of the response, if available
  // err.content.text MAY be set to the error text thrown of the API, if available
}
```

The API can throw server errors (status > `500`) that don't have a `text` property set, but if
it responds with a error, the following error texts can appear:

- endpoint requires authentication
- invalid key
- requires scope xyz
- membership required
- access restricted to guild leaders
- page out of range
- no such id
- all ids provided are invalid

## Mocking

If you want to mock this module in your tests, you can replace the underlying 
request library with the provided mock module, e.g. using [rewire](https://github.com/jhnns/rewire).

You can find all available mock methods here: https://github.com/gw2efficiency/requester#mocking

```js
const rewire = require('rewire')
const requesterMock = require('gw2e-requester/mock')
const file = rewire('../some/file/using/gw2api/client.js')

// Get the variable "api" (which is the initialized api client)
// and replace the requester method with the requesterMock
file.__get__('api').requester = requesterMock

// Use the requester mock methods as described in the link above
```

## Tests

```
npm test
```

## Licence

MIT
