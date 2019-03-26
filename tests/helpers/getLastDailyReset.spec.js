/* eslint-env jest */
const mockdate = require('mockdate')
const getLastDailyReset = require('../../src/helpers/getLastDailyReset')

describe('helpers > getLastDailyReset', () => {
  const _lastDailyReset = (date) => {
    mockdate.set(date)
    return getLastDailyReset().toISOString()
  }

  it('gets the last reset correctly', () => {
    expect(_lastDailyReset('2017-08-13T02:04:52.278Z')).toEqual('2017-08-13T00:00:00.000Z')
    expect(_lastDailyReset('2017-08-11T02:04:52.278Z')).toEqual('2017-08-11T00:00:00.000Z')
    expect(_lastDailyReset('2017-07-31T12:04:52.278Z')).toEqual('2017-07-31T00:00:00.000Z')

    expect(_lastDailyReset('2017-08-11T23:59:59.000Z')).toEqual('2017-08-11T00:00:00.000Z')
    expect(_lastDailyReset('2017-08-12T00:00:00.000Z')).toEqual('2017-08-12T00:00:00.000Z')
    expect(_lastDailyReset('2017-08-12T00:00:01.000Z')).toEqual('2017-08-12T00:00:00.000Z')
  })
})
