### `gw2api-client/build/cache/null`

The default storage. Does no caching at all.

```js
import cacheNull from 'gw2api-client/build/cache/null'
api.cacheStorage(cacheNull())
```

---

### `gw2api-client/build/cache/memory`

Caches the data using a basic in-memory storage.

**Options:**

- `gcTick` *(optional)* - How often the garbage collection should clean out expired data (in ms). Defaults to `5 * 60 * 1000`.

```js
import cacheMemory from 'gw2api-client/build/cache/memory'

const options = {
  gcTick: 5 * 60 * 1000
}

api.cacheStorage(cacheMemory(options))
```

---

### `gw2api-client/build/cache/browser`

Caches the data in-memory but saves a persistent version into IndexedDB to hydrate the cache from on page load.

**Options:**

- `storageKey` *(optional)* - The cache key. Defaults to `gw2api-cache`.
- `gcTick` *(optional)* - How often the garbage collection should clean out expired data (in ms). Defaults to `5 * 60 * 1000`.
- `persistDebounce` *(optional)* - How much time has to pass between the API request and the persisting into storage (in ms). Defaults to `3 * 1000`.
- `storageEngine` - *(optional)* - A storage engine, with the same interface as [`idb-keyval`](https://www.npmjs.com/package/idb-keyval#usage)

```js
import cacheBrowserStorage from 'gw2api-client/build/cache/browser'

const options = {
  gcTick: 3 * 60 * 1000
}

api.cacheStorage(cacheBrowserStorage(options))
```

---

### `gw2api-client/build/cache/redis`

Caches the data using [Redis](https://redis.io).

**Options:**

- `redis` - An instance of [node_redis](https://github.com/NodeRedis/node_redis)
- `prefix` *(optional)* - The prefix for the cache keys. Defaults to `gw2api-`.

```js
import redis from 'redis'
import cacheRedis from 'gw2api-client/build/cache/redis'

const options = {
  redis: redis.createClient(),
  prefix: 'optional-prefix-'
}

api.cacheStorage(cacheRedis(options))
```

---

### Custom

You can write a custom storage to fit your architecture. It has to be a function which takes a configuration object:

```js
function cacheCustom (config) {
  // Do configuration things with the `config` object ...
  
  // Return an object with the implementations
  return {
    get: (key) => ...,
    ...
  }
}

api.cacheStorage(cacheCustom({foo: 'bar'}))
```

This function has to return an object containing implementations of the following functions, which all have to return a `Promise` object.

- `get(key)` - Gets a single value by key. Has to resolve to `null` if the value does not exist or is expired.
- `mget([key, key, ...])` - Gets multiple values by keys. Resolves an array. Missing and expired elements have to be set to `null`. Has to maintain the order of keys when resolving into values.
- `set(key, value, expiresInSeconds)` - Sets a single value by key.
- `mset([[key, value, expiresInSeconds], ...])` - Sets multiple values.
- `flush()` - Clears the cache data (only needed for tests).
