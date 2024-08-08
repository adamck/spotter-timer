import { create } from 'zustand'

interface TimerState {
  // in ms
  time: number
  running: boolean
  tick: () => void
  start: () => void
  stop: () => void
  reset: (time: number) => void
  set: (time: number) => void
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 0,
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
      return {
        time,
        running: time > 0,
      }
    }),

  set: (time) =>
    set(() => ({
      time,
    })),

  reset: (time) =>
    set(() => ({
      running: false,
      time,
    })),
}))

export const defaultTime = 10 //* 1000
