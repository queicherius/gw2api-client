const debounce = require('debounce')
const idbKeyval = require('idb-keyval')

module.exports = function (configuration) {
  configuration = Object.assign({
    storageKey: 'gw2api-cache',
    gcTick: 5 * 60 * 1000,
    persistDebounce: 3 * 1000,
    storageEngine: idbKeyval
  }, configuration)

  let _storage = {}
  const storageEngine = configuration.storageEngine
  const storageKey = configuration.storageKey
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
    _storage[key] = { value, expiry: (new Date()).getTime() + expiry * 1000 }
    persist()
  }

  function _persist () {
    storageEngine.set(storageKey, _storage)
      .catch(/* istanbul ignore next */ err => {
        console.warn('Failed persisting cache', err)
      })
  }

  function hydrate () {
    storageEngine.get(storageKey)
      .then(value => {
        if (value) {
          _storage = value
        }
      })
  }

  function flush () {
    _storage = {}
    storageEngine.delete(storageKey)
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

  return { get, set, mget, mset, flush, _getStorage }
}
