export default function (configuration) {
  configuration = {gcTick: 5 * 60 * 1000, ...configuration}

  // Scope the storage to the function, so multiple instances don't interfere
  let _storage = {}

  function get (key) {
    return Promise.resolve(_get(key))
  }

  function _get (key) {
    let value = _storage[key]
    let now = (new Date()).getTime()
    return value && value.expiry > now ? value.value : null
  }

  function set (key, value, expiry) {
    _set(key, value, expiry)
    return Promise.resolve(true)
  }

  function _set (key, value, expiry) {
    _storage[key] = {value, expiry: (new Date()).getTime() + expiry * 1000}
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

  function flush () {
    _storage = {}
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
  }

  setInterval(garbageCollection, configuration.gcTick)
  garbageCollection()

  return {get, set, mget, mset, flush, _getStorage}
}
