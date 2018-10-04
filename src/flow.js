async function parallel (promises) {
  const results = await Promise.all(
    Object.values(promises).map(func => func())
  )

  // If the initial structure was an array, just return the array of results
  if (Array.isArray(promises)) {
    return results
  }

  // If the initial structure was an object, rebuild an object with the results
  const keys = Object.keys(promises)
  return results.reduce((object, resultPart, index) => {
    object[keys[index]] = resultPart
    return object
  }, {})
}

module.exports = { parallel }
