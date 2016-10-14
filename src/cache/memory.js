import flow from 'promise-control-flow'
let storage = {}

export default function () {
  return {get, set, mget, mset, flush}
}

function get (key) {
  let value = storage[key]
  let now = (new Date()).getTime()

  value = value && value.expiry > now ? value.value : false
  return promisify(value)
}

function set (key, value, expiry) {
  storage[key] = {value, expiry: (new Date()).getTime() + expiry * 1000}
  return promisify(true)
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
  storage = []
  return promisify(true)
}

function promisify (value) {
  return new Promise(resolve => resolve(value))
}
