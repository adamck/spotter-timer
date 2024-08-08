import { formatTime } from '@/lib/time'
import { useTimerStore } from '@/state/store'
import { FC, KeyboardEventHandler, useRef, useState } from 'react'
import Chart, { Props as ChartProps } from 'react-apexcharts'
import ContentEditable from 'react-contenteditable'

const riskColorsRadial = {
  low: '#6CD85B',
  medium: '#F1B518',
  high: '#FB3131',
}

const getChartOptions = (value: number, total: number): ChartProps =>
  ({
    chart: {
      height: 200,
      type: 'radialBar',
      // TODO: need to fix the animation by ticking milliseconds
      // animations: {
      //   enabled: false,
      //   easing: 'easeout',
      //   speed: 1000,
      // },
    },
    colors: [riskColorsRadial.low],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '75%',
        },
        startAngle: 0,
        endAngle: 360,
        track: {
          background: '#222c31', // bg-brand-65
          startAngle: 0,
          endAngle: 360,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: ['#fff'],
    },
    // TODO: show off w some nice gradient work?
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shade: 'dark',
    //     type: 'horizontal',
    //     colorStops: [
    //       {
    //         offset: 0,
    //         color: riskColorsRadial.low,
    //         opacity: 1,
    //       },
    //       {
    //         offset: 100,
    //         color: riskColorsRadial.medium,
    //         opacity: 1,
    //       },
    //     ],
    //   },
    // },
    stroke: {
      lineCap: 'round',
    },
    // animateGradually: {
    //   enabled: false,
    //   delay: 2000,
    // },
  } as ChartProps)

type Props = {
  total: number
  value: number
}

const RadialGauge: FC<Props> = ({ value, total }) => {
  const start = useTimerStore((state) => state.start)
  const stop = useTimerStore((state) => state.stop)
  const set = useTimerStore((state) => state.set)
  const running = useTimerStore((state) => state.running)

  const [isEditing, setIsEditing] = useState(false)
  const [wasRunning, setWasRunning] = useState(running)
  const input = useRef(value.toString())
  const editableRef = useRef<HTMLDivElement>(null)

  const options = getChartOptions(value, total)

  const onEditableFocus = () => {
    // UX decision to pause the timer when inputting new time value
    stop()

    setIsEditing(true)
    setWasRunning(running)

    input.current = formatTime(value)
  }

  const onEditableBlur = () => {
    if (wasRunning) {
      start()
    }
  }

  const onEditableKeyDown: KeyboardEventHandler = (e) => {
    // prevent new line flicker
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const onEditableKeyUp: KeyboardEventHandler = (e) => {
    //
    // special handling for Enter and Escape
    // ie, submit and discard changes, respectively
    //
    if (e.code === 'Enter') {
      e.preventDefault()

      editableRef.current?.blur()

      setIsEditing(false)

      const split = input.current.split(':')
      let mins = 0
      let secs = 0

      if (split.length === 1) {
        // user deleted the colon, just parse time from the integer remaining
        secs = parseInt(split[0])
      } else if (split.length === 2) {
        mins = parseInt(split[0])
        secs = parseInt(split[1])
      } else {
        // something weird happened. user shouldn't be able to type in an extra colon
        // TODO: do what?
      }

      set(secs + mins * 60)

      if (wasRunning) {
        start()
      }

      return
    }

    if (e.code === 'Escape') {
      e.preventDefault()

      editableRef.current?.blur()

      setIsEditing(false)

      return
    }

    //
    // now handle valid non-numeric input and otherwise exit on anything else
    //
    const validNaN = ['ArrowLeft', 'ArrowRight', 'Backspace']

    if (isNaN(parseInt(e.key)) && !validNaN.includes(e.key)) {
      e.preventDefault()
      return
    }

    input.current = e.currentTarget.innerHTML
  }

  // unused but a necessary prop for ContentEditable *shrug*
  const _onEditableChange = () => {}

  return (
    <div className="md:w-[320px] lg:w-[462px] relative">
      <Chart
        options={options}
        series={[(value / total) * 100]}
        type="radialBar"
        width="100%"
      />

      <div className="text-white text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ContentEditable
          innerRef={editableRef}
          html={isEditing ? input.current : formatTime(value)}
          onFocus={onEditableFocus}
          onBlur={onEditableBlur}
          onKeyUp={onEditableKeyUp}
          onKeyDown={onEditableKeyDown}
          onChange={_onEditableChange}
        />
      </div>
    </div>
  )
}

export default RadialGauge
