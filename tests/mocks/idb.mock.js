let cache = {}

module.exports = {
  set: (key, value) => {
    cache[key] = value
    return Promise.resolve()
  },
  get: (key) => {
    return Promise.resolve(cache[key])
  },
  keys: () => {
    return Promise.resolve(Object.keys(cache))
  },
  delete: (key) => {
    delete cache[key]
    return Promise.resolve()
  },
  clear: () => {
    cache = {}
    return Promise.resolve()
  }
}
