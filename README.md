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

By default all requests get send to the live API. However, you can easily enable caching for all appropriate endpoints by giving the client a cache storage to work with. You can find the default cache times of all endpoints [here](./endpoints.md).

```js
import memoryStorage from 'gw2api-client/build/cache/memory'
api.cacheStorage(memoryStorage())

// This will only call the official API once
api().items().ids()
// ...
api().items().ids()

// When the cache expired this will call the official API again
api().items().ids()

// Skip the cache if you want guaranteed live data
api().items().live().ids()
```

> **Note:** Since the cache storage save is asynchronous in the background (during which the API function already returns a result), it *can* happen that some data gets requested twice if you request it in rapid succession.

#### Cache Storages

This are the cache storages included in this module. Feel free to write your own implementation! (Please send a PR :<3:.)

**`gw2api-client/build/cache/null`**

The default storage, does no caching at all.

```js
import cacheNull from 'gw2api-client/build/cache/null'
api.cacheStorage(cacheNull())
```

**`gw2api-client/build/cache/memory`**

Caches the data a basic in-memory storage.

```js
import cacheMemory from 'gw2api-client/build/cache/memory'
api.cacheStorage(cacheMemory())
```

**`gw2api-client/build/cache/localStorage`**

Caches the data using [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) and memory. Requires a configuration parameter with `localStorage` (or an equivalent interface, like [this](https://www.npmjs.com/package/node-localstorage)) and can take an optional `prefix`.

```js
import cacheLocalStorage from 'gw2api-client/build/cache/localStorage'
api.cacheStorage(cacheLocalStorage({localStorage: window.localStorage, prefix: 'optional-prefix-'}))
```

**`gw2api-client/build/cache/redis`**

Caches the data using [Redis](https://redis.io). Requires a configuration parameter with an instance of [node_redis](https://github.com/NodeRedis/node_redis) and can take an optional `prefix`.

```js
import redis from 'redis'
import cacheRedis from 'gw2api-client/build/cache/redis'

// Create the redis client
// See https://github.com/NodeRedis/node_redis#rediscreateclient
const client = redis()

// Attach the storage
api.cacheStorage(cacheRedis({redis: client, prefix: 'optional-prefix-'}))
```

**Custom**

A custom storage has to be a method which can take a configuration object:

```js
function cacheCustom (config) {
  // Do configuration things
  return {
    get: (key) => ...,
    ...
  }
}

api.cacheStorage(cacheCustom({foo: 'bar'}))
```

This function has to return an object containing implementations of the following methods, which all have to return a `Promise` object.

- `get(key)` - Gets a single value by key. Resolves `null` if the value does not exist or is expired.
- `mget([key, key, ...])` - Gets multiple values by keys. Resolves an array. Missing and expired elements are either not included in the return array or set to `null`.
- `set(key, value, expiresInSeconds)` - Sets a single value by key.
- `mset([[key, value, expiresInSeconds], ...])` - Sets multiple values.
- `flush()` - Completely clears the cache data (only needed for tests)

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
import client from 'gw2api-client'

// Get an instance of an API client
let api = client()

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

// This request will now retry if it fails
api().items().ids()
```

### Extending

You can extend or overwrite the API client with your own endpoints if you wish so. The only thing that is required, is an extension of `AbstractEndpoint` to provide all the logic for pagination, bulk, localisation, caching etc.

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
    this.cacheTime = 5 * 60
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

If you want to mock this module in your tests, you can replace the underlying request library with the provided mock module, e.g. using [rewire](https://github.com/speedskater/babel-plugin-rewire). You can find all available mock methods [here](https://github.com/queicherius/lets-fetch#mocking).

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
