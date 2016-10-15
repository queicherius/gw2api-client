import flow from 'promise-control-flow'

export default function (configuration) {
  configuration = {prefix: 'gw2api-', gcTick: 5 * 60 * 1000, ...configuration}

  if (!configuration.localForage) {
    throw new Error('The `localForage` cache storage requires a `localForage` instance')
  }

  let storage = configuration.localForage
  let prefix = configuration.prefix

  function get (key) {
    let now = (new Date()).getTime()

    return storage.getItem(prefix + key)
      .then(value => {
        if (!value) {
          return null
        }

        value = JSON.parse(value)
        return value && value.expiry > now ? value.value : null
      })
  }

  function set (key, value, expiry) {
    value = {value, expiry: (new Date()).getTime() + expiry * 1000}
    return storage.setItem(prefix + key, JSON.stringify(value))
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
    return storage.clear()
  }

  function garbageCollection () {
    let now = (new Date()).getTime()

    function handleKey (key) {
      // Only check local storage keys that still exist and seem to be caching keys
      if (!key || key.indexOf(prefix) !== 0) {
        return Promise.resolve()
      }

      // Remove the keys that are expired (and ignore race condition errors)
      return storage.getItem(key).then(value => {
        if (value && JSON.parse(value).expiry < now) {
          return storage.removeItem(key).catch(() => false)
        }

        return Promise.resolve()
      })
    }

    return storage.keys().then(keys => {
      let promises = keys.map(key => () => handleKey(key))
      return flow.parallel(promises)
    })
  }

  setInterval(garbageCollection, configuration.gcTick)
  garbageCollection()

  return {get, set, mget, mset, flush}
}
