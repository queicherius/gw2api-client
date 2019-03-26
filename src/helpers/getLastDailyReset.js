function getLastDailyReset () {
  // Get a string of the date/time of today, in UTC, at midnight
  const date = new Date().toISOString().replace(/T.*Z/, `T00:00:00.000Z`)

  // Parse the string back into a Date object
  return new Date(date)
}

module.exports = getLastDailyReset
