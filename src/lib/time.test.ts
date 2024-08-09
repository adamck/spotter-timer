import { formatTime, getMinutes, getSeconds } from './time'

describe('time utils specific to Timer', () => {
  it('should format time from seconds', () => {
    expect(formatTime(60)).toEqual('01:00')
    expect(formatTime(1)).toEqual('00:01')
    expect(formatTime(5999)).toEqual('99:59')
    expect(formatTime(6000)).toEqual('100:00')
  })

  it('should return minutes from a total seconds value', () => {
    expect(getMinutes(60)).toEqual(1)
    expect(getMinutes(59)).toEqual(0)
    expect(getMinutes(0)).toEqual(0)
  })

  it('should return seconds from a total seconds value', () => {
    expect(getSeconds(10)).toEqual(10)
    expect(getSeconds(70)).toEqual(10)
    expect(getSeconds(100)).toEqual(40)
  })
})
