/**
 * Format a number of milliseconds as mm:ss always with padded zeros
 */
export const formatTime = (time: number) => {
  if (isNaN(time) || time == 0) return '00:00'

  const mins = getMinutes(time).toString().padStart(2, '0')
  const secs = getSeconds(time).toString().padStart(2, '0')

  return `${mins}:${secs}`
}

export const getMinutes = (time: number) => Math.floor(time / 60)

export const getSeconds = (time: number) => Math.round(time % 60)
