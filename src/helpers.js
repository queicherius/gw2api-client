// Chunk an array into specific sizes
function chunk (array, size) {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, size + i))
  }
  return result
}

// Get the unique elements of an array
function unique (array) {
  return array.filter((x, i, self) => self.indexOf(x) === i)
}

// Flatten an array of arrays into a one dimensional array
function flatten (array) {
  return array.reduce((x, y) => x.concat(y), [])
}

module.exports = {chunk, unique, flatten}
