export default function (configuration) {
  configuration = {prefix: 'gw2api-', ...configuration}

  if (!configuration.redis) {
    throw new Error('The `redis` cache storage requires a `redis` instance')
  }

  let redisClient = configuration.redis
  let prefix = configuration.prefix

  function get (key) {
    return new Promise((resolve, reject) => {
      redisClient.get(prefix + key, (err, value) => {
        /* istanbul ignore next */
        if (err) return reject(err)
        return resolve(JSON.parse(value))
      })
    })
  }

  function set (key, value, expiry) {
    return new Promise((resolve, reject) => {
      redisClient.set(prefix + key, JSON.stringify(value), (err) => {
        /* istanbul ignore next */
        if (err) return reject(err)
        redisClient.expire(prefix + key, expiry)
        return resolve(true)
      })
    })
  }

  function mget (keys) {
    keys = keys.map(key => prefix + key)

    return new Promise((resolve, reject) => {
      redisClient.mget(keys, (err, results) => {
        /* istanbul ignore next */
        if (err) return reject(err)
        return resolve(results.map(x => JSON.parse(x)))
      })
    })
  }

  function mset (values) {
    const redisCommands = values
      .map(value => [prefix + value[0], JSON.stringify(value[1])])
      .reduce((a, b) => a.concat(b), [])

    return new Promise((resolve, reject) => {
      redisClient.mset(redisCommands, (err) => {
        /* istanbul ignore next */
        if (err) return reject(err)

        // Set the expire time of all keys in batch
        let batch = redisClient.batch()
        values.map(value => {
          batch.expire(prefix + value[0], value[2])
        })

        batch.exec(err => {
          /* istanbul ignore next */
          if (err) return reject(err)
          return resolve(true)
        })
      })
    })
  }

  function flush () {
    return new Promise((resolve, reject) => {
      redisClient.keys(prefix + '*', (err, keys) => {
        /* istanbul ignore next */
        if (err) return reject(err)

        // Delete the matched keys in batch
        let batch = redisClient.batch()
        keys.map(key => {
          batch.del(key)
        })

        batch.exec(err => {
          /* istanbul ignore next */
          if (err) return reject(err)
          return resolve(true)
        })
      })
    })
  }

  return {get, set, mget, mset, flush}
}
