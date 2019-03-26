/* eslint-env jest */
const mockdate = require('mockdate')
const resetTime = require('../../src/helpers/resetTime')

describe('helpers > resetTime', () => {
  it('gets a day at a specific time', () => {
    expect(resetTime.getDateAtTime(new Date('2017-08-13T02:04:52.278Z'), '00:01:00'))
      .toEqual(new Date('2017-08-13T00:01:00.000Z'))
  })

  it('gets the next daily reset', () => {
    const dailyReset = (date) => {
      return resetTime.getDailyReset(date).toISOString()
    }

    expect(dailyReset('2017-08-13T02:04:52.278Z')).toEqual('2017-08-14T00:00:00.000Z')
    expect(dailyReset('2017-08-11T02:04:52.278Z')).toEqual('2017-08-12T00:00:00.000Z')
    expect(dailyReset('2017-07-31T12:04:52.278Z')).toEqual('2017-08-01T00:00:00.000Z')

    expect(dailyReset('2017-08-11T23:59:59.000Z')).toEqual('2017-08-12T00:00:00.000Z')
    expect(dailyReset('2017-08-12T00:00:00.000Z')).toEqual('2017-08-13T00:00:00.000Z')
    expect(dailyReset('2017-08-12T00:00:01.000Z')).toEqual('2017-08-13T00:00:00.000Z')
  })

  it('gets the last daily reset', () => {
    const lastDailyReset = (date) => {
      mockdate.set(date)
      return resetTime.getLastDailyReset().toISOString()
    }

    expect(lastDailyReset('2017-08-13T02:04:52.278Z')).toEqual('2017-08-13T00:00:00.000Z')
    expect(lastDailyReset('2017-08-11T02:04:52.278Z')).toEqual('2017-08-11T00:00:00.000Z')
    expect(lastDailyReset('2017-07-31T12:04:52.278Z')).toEqual('2017-07-31T00:00:00.000Z')

    expect(lastDailyReset('2017-08-11T23:59:59.000Z')).toEqual('2017-08-11T00:00:00.000Z')
    expect(lastDailyReset('2017-08-12T00:00:00.000Z')).toEqual('2017-08-12T00:00:00.000Z')
    expect(lastDailyReset('2017-08-12T00:00:01.000Z')).toEqual('2017-08-12T00:00:00.000Z')
  })

  it('gets the next weekly reset', () => {
    const weeklyReset = (date) => {
      return resetTime.getWeeklyReset(date).toISOString()
    }

    expect(weeklyReset('2017-08-10T02:04:52.278Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(weeklyReset('2017-08-13T02:04:52.278Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(weeklyReset('2017-08-14T06:04:52.278Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(weeklyReset('2017-07-31T09:04:52.278Z')).toEqual('2017-08-07T07:30:00.000Z')

    expect(weeklyReset('2017-08-14T07:29:59.000Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(weeklyReset('2017-08-14T07:30:00.000Z')).toEqual('2017-08-21T07:30:00.000Z')
    expect(weeklyReset('2017-08-14T07:30:01.000Z')).toEqual('2017-08-21T07:30:00.000Z')
    expect(weeklyReset('2017-08-14T07:35:00.000Z')).toEqual('2017-08-21T07:30:00.000Z')
  })

  it('gets the last weekly reset', () => {
    const lastWeeklyReset = (date) => {
      mockdate.set(date)
      return resetTime.getLastWeeklyReset().toISOString()
    }

    expect(lastWeeklyReset('2017-08-10T02:04:52.278Z')).toEqual('2017-08-07T07:30:00.000Z')
    expect(lastWeeklyReset('2017-08-13T02:04:52.278Z')).toEqual('2017-08-07T07:30:00.000Z')
    expect(lastWeeklyReset('2017-08-14T06:04:52.278Z')).toEqual('2017-08-07T07:30:00.000Z')
    expect(lastWeeklyReset('2017-07-31T09:04:52.278Z')).toEqual('2017-07-31T07:30:00.000Z')

    expect(lastWeeklyReset('2017-08-14T07:29:59.000Z')).toEqual('2017-08-07T07:30:00.000Z')
    expect(lastWeeklyReset('2017-08-14T07:30:00.000Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(lastWeeklyReset('2017-08-14T07:30:01.000Z')).toEqual('2017-08-14T07:30:00.000Z')
    expect(lastWeeklyReset('2017-08-14T07:35:00.000Z')).toEqual('2017-08-14T07:30:00.000Z')
  })
})
