let memory = {}

export default {
  get: (key) => {
    return promisify(memory[key])
  },
  set: (key, value) => {
    memory[key] = value
    return promisify(true)
  },
  mget: (keys) => {
    let result = keys.map(key => memory[key])
    return promisify(result)
  },
  mset: (array) => {
    array.map(element => {
      memory[element[0]] = element[1]
    })
    return promisify(true)
  },
  flush: () => {
    memory = []
    return promisify(true)
  }
}

function promisify (value) {
  return new Promise(resolve => resolve(value))
}
