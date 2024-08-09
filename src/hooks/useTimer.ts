import { useCallback, useEffect, useRef } from 'react'

/**
 * avoid setInterval drift by using requestAnimationFrame
 */
export const useTimer = (running: boolean, tick: () => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>()
  const prevTimeRef = useRef<number>()

  const frameTick = () => {
    const curTime = new Date().getTime()

    if (prevTimeRef.current === undefined) {
      prevTimeRef.current = curTime
    } else {
      const delta = curTime - prevTimeRef.current

      // console.log('=======================')
      // console.log('delta', delta)
      // console.log('=======================')

      if (delta >= 1000) {
        // console.log('=======================')
        // console.log('tick', curTime, prevTimeRef.current, delta)
        // console.log(new Date().getTime())
        // console.log('=======================')

        prevTimeRef.current = curTime
        tick()
      }
    }

    requestRef.current = requestAnimationFrame(frameTick)
  }

  const cancel = useCallback(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }, [requestRef.current])

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(frameTick)
    } else {
      cancel()
    }

    return cancel
  }, [running])
}
