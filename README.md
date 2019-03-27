# gw2api-client

[![Build Status](https://img.shields.io/travis/queicherius/gw2api-client.svg?style=flat-square)](https://travis-ci.org/queicherius/gw2api-client)
[![Coverage Status](https://img.shields.io/codecov/c/github/queicherius/gw2api-client/master.svg?style=flat-square)](https://codecov.io/github/queicherius/gw2api-client)
[![Greenkeeper badge](https://badges.greenkeeper.io/queicherius/gw2api-client.svg?style=flat-square)](https://greenkeeper.io/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/gw2api-client.svg?style=flat-square)](https://bundlephobia.com/result?p=gw2api-client)

> Javascript wrapper for the official Guild Wars 2 API.

## Install

```bash
npm install gw2api-client
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). 

## Usage

### Basic usage

```js
const client = require('gw2api-client')

// Get an instance of an API client
let api = client()

// Optional, but recommended: Set the schema version of the client
api.schema('2019-03-26T00:00:00Z')

// Optional: Set the language of the client
api.language('en')

// Optional: Authenticate the client using an API key
api.authenticate('my-secret-key')

// Get the ids of all items
api.items().ids().then(items => console.log(items))

// Get a single item
api.items().get(123).then(item => console.log(item))

// Get multiple items
api.items().many([123, 456]).then(items => console.log(items))

// Get all items
api.items().all().then(items => console.log(items))
```

### Endpoints

**[You can find all endpoints and their respective function calls in this document.](./docs/endpoints.md)**

### Caching

**[You can find all cache storages (and the interface for custom ones) in this document.](./docs/cache-storages.md)**

By default, calling any endpoint requests data from the live API. However, you can easily enable caching for all appropriate endpoints by giving the client a cache storage to work with. You can find the default cache times of all endpoints [here](./docs/endpoints.md).

```js
const cacheMemory = require('gw2api-client/src/cache/memory')
api.cacheStorage(cacheMemory())

// This will only call the official API once
api.items().ids()
// ...
api.items().ids()

// When the cache expires, this will call the official API again
api.items().ids()

// You can skip the cache for guaranteed live data
api.items().live().ids()
```

> **Note:** The cache storage save is asynchronous in the background. During this time, the API function already resolves a result for best performance. Therefore it *can* happen that some data gets requested twice, if you request it in rapid succession and are not using a cache that saves in memory (memory or browser caches).

You can also chain multiple cache storages together. In this case, the cache gets saved in all storages and read from the first storage in the list answering with a valid value. The more persistent and more reliable cache storages should therefore be on the end of the list and the fastest (e.g. memory) should be at the start of the list.

```js
const cacheMemory = require('gw2api-client/src/cache/memory')
const cacheRedisStorage = require('gw2api-client/src/cache/redis')

// Save in memory and local storage
// Try to answer from memory first, then from local storage and then hit the API
api.cacheStorage([
  cacheMemory(),
  cacheRedisStorage({ ... })
])
```

The cache uses expiration times and not the build number, because the content of the API can update independently of the build id. This is caused by the internal whitelisting of the API. However, if you want your cache to invalidate when there is a game update, this is easily possible too:

```js
// configure api.cacheStorage(...) beforehand

// Check the build every 10 minutes and flush the cache if it updated
setInterval(() => api.flushCacheIfGameUpdated(), 10 * 60 * 1000)
```

### Error handling

You can use the Promise `catch` to handle all possible errors.

```js
api.account().bank().catch(err => {
  // err.response is the last response object (e.g. err.response.status)
  // err.content is the parsed body of the response, if available
  // err.content.text is the error text thrown of the API, if available
  console.error('Something went wrong', err)
})
```

The API can throw server errors (status >= 500) that don't have a `text` property set. However, most of the time it responds with one of the following errors:

- `endpoint requires authentication`
- `invalid key`
- `requires scope <xyz>`
- `membership required`
- `access restricted to guild leaders`
- `page out of range`
- `no such id`
- `all ids provided are invalid`

### Retrying

By accessing the `fetch` instance, you can enable retrying in case the API or the user has problems getting a valid response. You can find the full documentation for retrying [here](https://github.com/queicherius/lets-fetch#retrying).

```js
// Retry up to 3 times if the status indicates an request error
api.fetch.retry((tries, err) => {
  if (tries > 3) { 
    return false
  }

  const res = err.response
  if (res && (res.status < 400 || res.status === 403)) {
    return false
  }

  return true
})

// Wait in between retries
api.fetch.retryWait((tries) => tries * 100)

// This request will now retry if it fails (e.g. API issues)
api.items().ids()
```

### Extending

You can extend or overwrite the API client with your own endpoints if you wish so. The only thing that is required is an extension of `AbstractEndpoint` to provide all the logic for pagination, bulk, localisation, caching and so on.

If you need more specific ways to handle data then the already defined ones, take a look at how the existing endpoints handle these edge cases (e.g. in [`/src/endpoints/recipes.js`](/src/endpoints/recipes.js)).

```js
const client = require('gw2api-client')
const AbstractEndpoint = require('gw2api-client/src/endpoint')

// Get an instance of an API client
const api = client()

// Example: Add a new function inside the abstract endpoint
AbstractEndpoint.prototype.post = function () {
  console.log(this)
}

// Example: Define our custom "items" endpoint
class ItemsEndpoint extends AbstractEndpoint {
  constructor (client) {
    super(client)
    this.baseUrl = 'https://api.my-domain.com'
    this.url = '/items'
    this.isPaginated = false
    this.isBulk = true
    this.supportsBulkAll = false
    this.isLocalized = true
    this.cacheTime = 5 * 60

    // Send credentials (e.g. session cookies)
    this.credentials = true
  }
}

// Attach it to the client, either as a new endpoint or overwriting an already existing one
api.items = () => new ItemsEndpoint(api)

// Use the new, overwritten endpoint
api.items().many([123, 456])
  .then(items => console.log('Got the items', items))
  .catch(err => console.error('Things went badly', err))
```

### Mocking

If you want to mock this module in your tests, you can replace the underlying `lets-fetch` library with the provided mock module, e.g. using [rewire](https://github.com/speedskater/babel-plugin-rewire). You can find all available mock methods [here](https://github.com/queicherius/lets-fetch#mocking).

```js
const fetchMock = require('lets-fetch/mock')
const file = require('./some/file/using/gw2api/client.js')

// Get the variable "api" (which would be the initialized api client
// in your own code) and replace the fetch method with the fetchMock
file.__get__('api').fetch = fetchMock

// Use the fetch mock methods as described in the link above
```

### Debugging

You can enable debug messages by setting a flag on the client:

```js
const client = require('gw2api-client')
let api = client()

// Set for specific endpoints
let items = api.items().debugging(true).ids().then(items => console.log(items))

// Set for all endpoints
api.debugging(true).items().ids().then(items => console.log(items))
```

## Tests

```bash
npm test
```

## Licence

MIT
