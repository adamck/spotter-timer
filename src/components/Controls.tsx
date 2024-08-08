import { defaultTime, useTimerStore } from '@/state/store'
import { PauseIcon, PlayIcon } from '@sanity/icons'
import { useCallback } from 'react'

const timeToAdd = 60

const Controls = () => {
  // TODO: change to useShallow
  const time = useTimerStore((state) => state.time)
  const running = useTimerStore((state) => state.running)
  const start = useTimerStore((state) => state.start)
  const stop = useTimerStore((state) => state.stop)
  const reset = useTimerStore((state) => state.reset)
  const set = useTimerStore((state) => state.set)

  const toggleTimer = useCallback(() => {
    running ? stop() : start()
  }, [running])

  const resetTimer = useCallback(() => {
    reset(defaultTime)
  }, [])

  const addTime = () => {
    set(time + timeToAdd)
  }

  return (
    <div className="flex w-full items-center justify-between px-8 text-white">
      <h3 className="cursor-pointer text-3xl w-[80px]" onClick={addTime}>
        +1:00
      </h3>
      <div
        className="cursor-pointer rounded-full size-20 flex items-center justify-center bg-brand-50 hover:bg-brand-70 transition ease-out duration-100"
        onClick={toggleTimer}
      >
        {running ? (
          <PauseIcon width={40} height={40} />
        ) : (
          <PlayIcon width={40} height={40} className="ml-1" />
        )}
      </div>
      <p
        className="cursor-pointer text-3xl w-[80px] text-right"
        onClick={resetTimer}
      >
        Reset
      </p>
    </div>
  )
}

export default Controls
