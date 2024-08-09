import Controls from '@/components/Controls'
import Header from '@/components/Header'
import RadialGauge from '@/components/RadialGauge'
import { useTimer } from '@/hooks/useTimer'
import { defaultTime, useTimerStore } from '@/state/store'
import { useEffect } from 'react'

const Timer = () => {
  // TODO: change to useShallow
  const time = useTimerStore((state) => state.time)
  const total = useTimerStore((state) => state.total)
  const tick = useTimerStore((state) => state.tick)
  const set = useTimerStore((state) => state.set)
  const running = useTimerStore((state) => state.running)

  useTimer(running, tick)

  useEffect(() => {
    // on init, setup timer with 10 secs on the clock
    set(defaultTime)
  }, [])

  return (
    <div className="max-w-[462px] mx-auto">
      <div className="flex flex-col items-center justify-center gap-[26px] md:gap-[40px] lg:gap-[100px] rounded-xl overflow-clip bg-brand-10 pb-6 lg:pb-12 shadow-md">
        <Header />
        <RadialGauge total={total ?? 0} value={time} />
        <Controls />
      </div>
    </div>
  )
}

export default Timer
