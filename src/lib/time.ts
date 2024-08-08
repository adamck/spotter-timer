/**
 * Format a number of seconds as mm:ss always with padded zeros
 */
export const formatTime = (time: number) => {
  // if (time > 5999)

  const mins = Math.floor(time / 60)
    .toString()
    .padStart(2, '0')
  const secs = (time % 60).toString().padStart(2, '0')

  return `${mins}:${secs}`
}
