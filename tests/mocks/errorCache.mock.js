module.exports = function () {
  return { get, set, mget, mset, flush }
}

function get () {
  return Promise.reject(new Error('Oh no.'))
}

function set () {
  return Promise.reject(new Error('Oh no.'))
}

function mget () {
  return Promise.reject(new Error('Oh no.'))
}

function mset () {
  return Promise.reject(new Error('Oh no.'))
}

function flush () {
  return Promise.reject(new Error('Oh no.'))
}
