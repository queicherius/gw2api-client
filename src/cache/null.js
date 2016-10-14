export default function () {
  return {get, set, mget, mset, flush}
}

function get (key) {
  return promisify(false)
}

function set (key, value, expiry) {
  return promisify(true)
}

function mget (keys) {
  return promisify([])
}

function mset (values) {
  return promisify(true)
}

function flush () {
  return promisify(true)
}

function promisify (value) {
  return new Promise(resolve => resolve(value))
}
