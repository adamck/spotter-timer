import { defaultTime, useTimerStore } from '@/state/store'
import { PauseIcon, PlayIcon } from '@sanity/icons'
import { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

const timeToAdd = 60

const Controls = () => {
  const { time, total, running, start, stop, reset, set } = useTimerStore(
    useShallow((state) => state)
  )

  const toggleTimer = useCallback(() => {
    running ? stop() : start()
  }, [running])

  const resetTimer = useCallback(
    (forceDefault: boolean = false) => {
      if (forceDefault) reset(defaultTime)
      else reset(total ?? defaultTime)
    },
    [total]
  )

  const addTime = () => {
    set(time + timeToAdd)
  }

  useEffect(() => {
    // spacebar to start/stop timer
    const keyHandler = (e: KeyboardEvent) => {
      // all keyboard shortcuts use Option (⌥)
      if (!e.altKey) return

      if (e.code === 'Space') {
        toggleTimer()
      } else if (e.code === 'KeyR') {
        if (e.shiftKey) {
          resetTimer(true)
        } else {
          resetTimer()
        }
      } else if (e.code === 'KeyA') {
        addTime()
      }
    }

    document.addEventListener('keypress', keyHandler)

    return () => {
      document.removeEventListener('keypress', keyHandler)
    }
  }, [running, time])

  return (
    <div className="flex w-full items-center justify-between px-4 lg:px-8 text-gray-900 dark:text-white">
      <button
        className="cursor-pointer text-2xl lg:text-3xl text-center w-[75px]"
        onClick={addTime}
        tabIndex={0}
        title="Add an additional minute (⌥+A)"
        aria-label="Add an additional minute"
      >
        +1:00
      </button>
      <button
        className="cursor-pointer rounded-full size-16 lg:size-20 flex items-center justify-center bg-gray-300 dark:bg-brand-50 hover:bg-gray-200 dark:hover:bg-brand-70 transition ease-out duration-100"
        onClick={toggleTimer}
        tabIndex={0}
        title="Start and stop the timer (⌥+SPACE)"
        aria-label="Start and stop the timer"
      >
        {running ? (
          <PauseIcon width={40} height={40} />
        ) : (
          <PlayIcon width={40} height={40} className="ml-1" />
        )}
      </button>
      <button
        className="cursor-pointer text-2xl lg:text-3xl text-center w-[75px]"
        onClick={() => resetTimer()}
        onDoubleClick={() => resetTimer(true)}
        tabIndex={0}
        title={`
          Reset the timer to its last set value (⌥+R).
          To reset to the initial value double-click or press Shift+⌥+R.
        `}
        aria-label="Reset the timer to its last set value"
      >
        Reset
      </button>
    </div>
  )
}

export default Controls
