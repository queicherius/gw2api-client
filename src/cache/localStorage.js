import debounce from 'debounce'

export default function (configuration) {
  configuration = {
    prefix: 'gw2api-',
    gcTick: 5 * 60 * 1000,
    persistDebounce: 3 * 1000,
    ...configuration
  }

  // Scope the storage to the function, so multiple instances don't interfere
  let _storage = {}

  if (!configuration.localStorage) {
    throw new Error('The `localStorage` cache storage requires a `localStorage` instance')
  }

  const localStorage = configuration.localStorage
  const storageKey = configuration.prefix + 'cache'
  const persist = debounce(_persist, configuration.persistDebounce)

  function get (key) {
    return Promise.resolve(_get(key))
  }

  function set (key, value, expiry) {
    _set(key, value, expiry)
    return Promise.resolve(true)
  }

  function mget (keys) {
    let values = keys.map(key => _get(key))
    return Promise.resolve(values)
  }

  function mset (values) {
    values.map(value => {
      _set(value[0], value[1], value[2])
    })

    return Promise.resolve(true)
  }

  function _get (key) {
    let value = _storage[key]
    let now = (new Date()).getTime()
    return value && value.expiry > now ? value.value : null
  }

  function _set (key, value, expiry) {
    _storage[key] = {value, expiry: (new Date()).getTime() + expiry * 1000}
    persist()
  }

  function _persist () {
    try {
      localStorage.setItem(storageKey, JSON.stringify(_storage))
    } catch (err) {
      // Since it is super easy to smash the quota, ignore that
      /* istanbul ignore next */
      console.warn('Failed persisting cache into localStorage')
    }
  }

  function hydrate () {
    try {
      _storage = JSON.parse(localStorage.getItem(storageKey))
    } catch (err) {
      // Error could be JSON not formatted right, no cache item, no support, ...
    }

    _storage = _storage || {}
  }

  function flush () {
    _storage = {}
    localStorage.removeItem(storageKey)
    return Promise.resolve(true)
  }

  function _getStorage () {
    return _storage
  }

  function garbageCollection () {
    const now = (new Date()).getTime()
    const keys = Object.keys(_storage)

    for (let i = 0; i !== keys.length; i++) {
      if (_storage[keys[i]].expiry < now) {
        delete _storage[keys[i]]
      }
    }

    persist()
  }

  setInterval(garbageCollection, configuration.gcTick)
  hydrate()
  garbageCollection()

  return {get, set, mget, mset, flush, _getStorage}
}
