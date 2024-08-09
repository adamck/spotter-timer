import { timeUnit } from '@/state/store'

/**
 * Format a number of milliseconds as mm:ss always with padded zeros
 */
export const formatTime = (time: number) => {
  time = time / timeUnit //0

  // console.log('=======================')
  // console.log('format', time)
  // console.log('=======================')

  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')

  let secs = Math.round(time % 60)
    .toString()
    .padStart(2, '0')

  return `${mins}:${secs}`
}
