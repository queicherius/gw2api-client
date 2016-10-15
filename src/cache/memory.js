import flow from 'promise-control-flow'

export default function (configuration) {
  configuration = {gcTick: 5 * 60 * 1000, ...configuration}

  // Scope the storage to the function, so multiple instances don't interfere
  let _storage = {}

  function get (key) {
    let value = _storage[key]
    let now = (new Date()).getTime()

    value = value && value.expiry > now ? value.value : null
    return Promise.resolve(value)
  }

  function set (key, value, expiry) {
    _storage[key] = {value, expiry: (new Date()).getTime() + expiry * 1000}
    return Promise.resolve(true)
  }

  function mget (keys) {
    let promises = keys.map(key => () => get(key))
    return flow.parallel(promises)
  }

  function mset (values) {
    let promises = values.map(value => () => set(value[0], value[1], value[2]))
    return flow.parallel(promises)
  }

  function flush () {
    _storage = []
    return Promise.resolve(true)
  }

  setInterval(function garbageCollection () {
    let now = (new Date()).getTime()
    for (var i in _storage) {
      if (_storage[i].expiry > now) {
        delete _storage[i]
      }
    }
  }, configuration.gcTick)

  return {get, set, mget, mset, flush, _storage}
}
