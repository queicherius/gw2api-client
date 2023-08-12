const DAY_MS = 24 * 60 * 60 * 1000

export function getDateAtTime (date: Date, time: string): Date {
  return new Date(date.toISOString().replace(/T.*Z/, `T${time}.000Z`))
}

export function getDailyReset (date: Date): Date {
  date = date ? new Date(date) : new Date()

  date = new Date(date.getTime() + DAY_MS)
  return getDateAtTime(date, '00:00:00')
}

export function getLastDailyReset (date: Date): Date {
  return new Date(getDailyReset(date).getTime() - DAY_MS)
}

export function getWeeklyReset (date: Date): Date {
  date = date ? new Date(date) : new Date()

  const weekday = date.getUTCDay()
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  let dayDiff = 0

  switch (weekday) {
    case 0:
      // 0 -> 1 sunday
      dayDiff = 1
      break
    case 1:
      // 1 -> 0 monday (if before reset)
      // 1 -> 7 monday (if after reset)
      const pastReset = hours > 7 || (hours === 7 && minutes >= 30)
      dayDiff = pastReset ? 7 : 0
      break
    default:
      // 2 -> 6 tuesday
      // 3 -> 5 wednesday
      // 4 -> 4 thursday
      // 5 -> 3 friday
      // 6 -> 2 saturday
      dayDiff = 8 - weekday
      break
  }

  date = new Date(date.getTime() + dayDiff * DAY_MS)
  return getDateAtTime(date, '07:30:00')
}

export function getLastWeeklyReset (date: Date): Date {
  return new Date(getWeeklyReset(date).getTime() - 7 * DAY_MS)
}