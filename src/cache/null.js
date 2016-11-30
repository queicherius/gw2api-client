export default function () {
  return {get, set, mget, mset, flush}
}

function get () {
  return Promise.resolve(null)
}

function set () {
  return Promise.resolve(true)
}

function mget (keys) {
  const values = keys.map(x => null)
  return Promise.resolve(values)
}

function mset () {
  return Promise.resolve(true)
}

function flush () {
  return Promise.resolve(true)
}
