# gw2api-client

[![Build Status](https://img.shields.io/travis/queicherius/gw2api-client.svg?style=flat-square)](https://travis-ci.org/queicherius/gw2api-client)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/gw2api-client/master.svg?style=flat-square)](https://codecov.io/github/queicherius/gw2api-client)

> Javascript wrapper for the official Guild Wars 2 API.

## Install

```bash
npm install gw2api-client
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). 

## Usage

### Basic usage

```js
import client from 'gw2api-client'
import flow from 'promise-control-flow'

// Get an instance of an API client
let api = client()

// Optional: Set the language of the client
api.language('en')

// Optional: Authenticate the client using an API key
api.authenticate('my-secret-key')

// Get the ids of all items
api.items().ids()
  .then(items => console.log(items))

// Note: If you want to request e.g. multiple items with different languages
// or API keys in *parallel*, you have to use *different* client instances
// for that, since language and key are connected to the client instance
flow.parallel([
  () => client().language('en').items().all(),
  () => client().language('de').items().all(),
  () => client().language('fr').items().all(),
  () => client().language('es').items().all()
])
```

### Endpoints

**[You can find all endpoints with their respective function calls in this document.](./endpoints.md)**

### Caching

**TODO: Write documentation**

### Error handling

You can use the Promise `catch` to handle all possible errors.

```js
api.account().bank()
  .catch(err => {
    // err.response is the last response object (e.g. err.response.status)
    // err.content is the parsed body of the response, if available
    // err.content.text is the error text thrown of the API, if available
    console.error('Something went wrong', err)
  })
```

The API can throw server errors (status >= `500`) that don't have a `text` property set.
However, most of the time it responds with one of the following errors:

- `endpoint requires authentication`
- `invalid key`
- `requires scope <xyz>`
- `membership required`
- `access restricted to guild leaders`
- `page out of range`
- `no such id`
- `all ids provided are invalid`

### Retrying

**TODO: Write documentation**

### Extending

You can extend or overwrite the API client with your own endpoints if you wish so. The only thing that is required, is an extension of `AbstractEndpoint` to provide all the logic for pagination, bulk, localization etc.

If you need more specific ways to handle data then the previously defined ones, take a look at how the existing endpoints handle these cases (e.g. in `/src/endpoints/recipes.js`)

```js
import client from 'gw2api-client'
import AbstractEndpoint from 'gw2api-client/build/endpoint'

// Get an instance of an API client
const api = client()

// Define our custom "items" endpoint
class ItemsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.baseUrl = 'https://api.my-domain.com'
    this.url = '/items'
    this.isPaginated = false
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
  }
}

// Attach it to the client, either as a new endpoint
// or overwriting an already existing one
api.items = () => new ItemsEndpoint(client)

// Use the new, overwritten endpoint
api.items().many([123, 456])
  .then(items => console.log('Got the items', items))
  .catch(err => console.error('Things went badly', err))
```

### Mocking

If you want to mock this module in your tests, you can replace the underlying 
request library with the provided mock module, e.g. using [rewire](https://github.com/speedskater/babel-plugin-rewire).

You can find all available mock methods here: https://github.com/queicherius/lets-fetch#mocking

```js
import fetchMock from 'lets-fetch/mock'
import file from './some/file/using/gw2api/client.js'

// Get the variable "api" (which is the initialized api client)
// and replace the fetch method with the fetchMock
file.__get__('api').fetch = fetchMock

// Use the fetch mock methods as described in the link above
```

## Tests

```bash
npm test
```

## Licence

MIT
