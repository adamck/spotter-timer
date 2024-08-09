import { create } from 'zustand'

interface TimerState {
  // in `timeUnit`
  time: number
  total: number | undefined
  running: boolean
  tick: () => void
  start: () => void
  stop: () => void
  reset: (time: number) => void
  set: (time: number) => void
}

export const timeUnit = 1
export const defaultTime = 10 * timeUnit

export const useTimerStore = create<TimerState>((set) => ({
  time: 0,
  total: undefined,
  running: false,

  start: () =>
    set(() => ({
      running: true,
    })),

  stop: () =>
    set(() => ({
      running: false,
    })),

  tick: () =>
    set((state) => {
      // stop when hitting zero
      const time = Math.max(0, state.time - 1)

      console.log('=======================')
      console.log('tick', time)
      console.log('=======================')

      return {
        time,
        running: time > 0,
      }
    }),

  set: (time) =>
    set((state) => {
      // initial set() call - set time and total the same.
      if (state.total === undefined) {
        return {
          time,
          total: time,
        }
      }

      // adding time to a timer that's alreadyy been init'd
      // account for time elapsed from the previous state
      if (state.total !== undefined && time > state.total) {
        const timeElapsed = state.total - state.time
        return {
          time,
          total: time + timeElapsed,
        }
      }

      // adding some amount of time smaller than the
      // present total so no need to update
      return {
        time,
      }
    }),

  reset: (time) =>
    set(() => ({
      running: false,
      time,
      total: time,
    })),
}))
