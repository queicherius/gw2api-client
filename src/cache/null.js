export default function () {
  return {get, set, mget, mset, flush}
}

function get (key) {
  return Promise.resolve(null)
}

function set (key, value, expiry) {
  return Promise.resolve(true)
}

function mget (keys) {
  const values = keys.map(x => null)
  return Promise.resolve(values)
}

function mset (values) {
  return Promise.resolve(true)
}

function flush () {
  return Promise.resolve(true)
}
