import Controls from '@/components/Controls'
import Header from '@/components/Header'
import RadialGauge from '@/components/RadialGauge'
import { useTimer } from '@/hooks/useTimer'
import { defaultTime, useTimerStore } from '@/state/store'
import { useEffect } from 'react'

const Timer = () => {
  // TODO: change to useShallow
  const time = useTimerStore((state) => state.time)
  const tick = useTimerStore((state) => state.tick)
  const set = useTimerStore((state) => state.set)
  const running = useTimerStore((state) => state.running)

  useTimer(running, tick)

  useEffect(() => {
    set(defaultTime)
  }, [])

  return (
    <div className="max-w-[462px] mx-auto">
      <div className="flex flex-col items-center justify-center md:gap-[40px] lg:gap-[100px] rounded-xl overflow-clip bg-brand-10 pb-12 shadow-md">
        <Header />
        <RadialGauge total={defaultTime} value={time} />
        <Controls />
      </div>
    </div>
  )
}

export default Timer
