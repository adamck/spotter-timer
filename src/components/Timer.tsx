import Controls from '@/components/Controls'
import Header from '@/components/Header'
import RadialGauge from '@/components/RadialGauge'
import { useTimer } from '@/hooks/useTimer'
import { defaultTime, useTimerStore } from '@/state/store'
import { useEffect, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'

const Timer = () => {
  const { time, total, tick, set, running } = useTimerStore(
    useShallow((state) => state)
  )

  // 👋🏼
  const helloWorldCount = useRef(0)

  // timer hook that runs the state tick fn
  useTimer(running, tick)

  useEffect(() => {
    // on init, setup timer with 10 secs on the clock
    set(defaultTime)

    if (helloWorldCount.current === 0) {
      console.log('============================')
      console.log(
        `'ello inspector. if you become bored timing things, try that X button`
      )
      console.log('============================')
    }

    helloWorldCount.current += 1
  }, [])

  return (
    <div className="max-w-[462px] mx-auto">
      <div className="flex flex-col items-center justify-center gap-[26px] md:gap-[40px] lg:gap-[100px] rounded-xl overflow-clip bg-gray-400 dark:bg-brand-10 pb-6 lg:pb-12 shadow-md">
        <Header />
        <RadialGauge total={total ?? 0} value={time} />
        <Controls />
      </div>
    </div>
  )
}

export default Timer
