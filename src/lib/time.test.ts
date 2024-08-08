import { formatTime } from './time'

describe('time utils specific to Timer', () => {
  it('should format time from seconds', () => {
    expect(formatTime(60)).toEqual('01:00')
    expect(formatTime(1)).toEqual('00:01')
    expect(formatTime(5999)).toEqual('99:59')
    expect(formatTime(6000)).toEqual('100:00')
  })
})
