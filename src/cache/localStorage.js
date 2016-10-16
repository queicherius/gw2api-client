import flow from 'promise-control-flow'

export default function (configuration) {
  configuration = {prefix: 'gw2api-', gcTick: 5 * 60 * 1000, ...configuration}

  if (!configuration.localStorage) {
    throw new Error('The `localStorage` cache storage requires a `localStorage` instance')
  }

  let storage = configuration.localStorage
  let prefix = configuration.prefix

  function get (key) {
    let now = (new Date()).getTime()
    let value

    try {
      value = JSON.parse(storage.getItem(prefix + key))
    } catch (err) {
      value = null
    }

    value = value && value.expiry > now ? value.value : null
    return Promise.resolve(value)
  }

  function set (key, value, expiry) {
    value = {value, expiry: (new Date()).getTime() + expiry * 1000}

    try {
      storage.setItem(prefix + key, JSON.stringify(value))
    } catch (err) {
      // Since it is super easy to smash the quota, ignore that
    }

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
    storage.clear()
    return Promise.resolve(true)
  }

  function garbageCollection () {
    let now = (new Date()).getTime()
    let length = storage.length

    for (var i = 0; i !== length; i++) {
      let key = storage.key(i)

      // Only check local storage keys that still exist and seem to be caching keys
      if (!key || key.indexOf(prefix) !== 0) {
        continue
      }

      // Remove the keys that are expired
      let value = storage.getItem(key)
      if (value && JSON.parse(value).expiry < now) {
        storage.removeItem(key)
      }
    }
  }

  setInterval(garbageCollection, configuration.gcTick)
  garbageCollection()

  return {get, set, mget, mset, flush}
}
