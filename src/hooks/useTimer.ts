import { useCallback, useEffect, useRef } from 'react'

/**
 * A better timer hook which avoids setInterval drift by using requestAnimationFrame.
 * start and stop it with the running parameter.
 * will call the tick parameter callback fn once per second.
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

      if (delta >= 1000) {
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
