import { useTimerStore } from './store'

describe('timer state management', () => {
  const initStoreState = useTimerStore.getState()

  beforeEach(() => {
    useTimerStore.setState(initStoreState)
  })

  it('should accept values for the current time', () => {
    const { set } = useTimerStore.getState()
    set(90)
    expect(useTimerStore.getState().time).toEqual(90)
  })

  it('should run after calling start()', () => {
    const { start } = useTimerStore.getState()
    start()
    expect(useTimerStore.getState().running).toEqual(true)
  })

  it('should stop after calling stop()', () => {
    const { start, stop } = useTimerStore.getState()
    start()
    stop()
    expect(useTimerStore.getState().running).toEqual(false)
  })

  it('should stop running and reset to the specified time', () => {
    const { reset } = useTimerStore.getState()
    reset(30)
    const state = useTimerStore.getState()
    expect(state.running).toEqual(false)
    expect(state.time).toEqual(30)
  })

  it('should increment time when tick() is called', () => {
    const { tick, set } = useTimerStore.getState()
    const startTime = 30
    set(startTime)
    tick()
    expect(useTimerStore.getState().time).toEqual(startTime - 1)
    tick()
    tick()
    expect(useTimerStore.getState().time).toEqual(startTime - 3)
  })
})
