import { formatTime, getMinutes, getSeconds } from '@/lib/time'
import { timeUnit, useTimerStore } from '@/state/store'
import {
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Chart, { Props as ChartProps } from 'react-apexcharts'
import ContentEditable from 'react-contenteditable'

const riskColorsRadial = {
  low: '#6CD85B',
  medium: '#F1B518',
  high: '#FB3131',
}

// TODO: if not changing any styles based on value/total, make this a const
// const getChartOptions = (value: number, total: number): ChartProps =>
const options: ChartProps = {
  chart: {
    height: 200,
    type: 'radialBar',
    animations: {
      enabled: true,
      easing: 'linear',
      speed: 1000,

      animateGradually: {
        enabled: false,
        delay: 0,
      },

      dynamicAnimation: {
        enabled: true,
        speed: 1000,
      },
    },
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

  markers: {
    size: 10,
    colors: '#fff000',
    strokeColors: '#fff000',
    strokeOpacity: 1,
    fillOpacity: 1,
    strokeWidth: 20,
    shape: 'circle',

    showNullDataPoints: true,
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
}

type Props = {
  total: number
  value: number
}

const RadialGauge: FC<Props> = ({ value, total }) => {
  const start = useTimerStore((state) => state.start)
  const stop = useTimerStore((state) => state.stop)
  const set = useTimerStore((state) => state.set)
  const running = useTimerStore((state) => state.running)

  const [wasRunning, setWasRunning] = useState(running)

  const input = useRef(value.toString())
  const editableRef = useRef<HTMLDivElement>(null)

  const onEditableFocus = () => {
    setWasRunning(running)

    // UX decision to pause the timer when inputting new time value
    stop()

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

      set((secs + mins * 60) * timeUnit)

      if (wasRunning) {
        start()
      }

      return
    }

    if (e.code === 'Escape') {
      e.preventDefault()

      editableRef.current?.blur()

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
  const _onEditableChange = () => null

  return (
    <div className="md:w-[320px] lg:w-[462px] relative text-center">
      <div className="text-xl  text-white my-[-12px]">
        <div
          className="inline-block"
          tabIndex={0}
          title="Total time"
          aria-label={`Total time: ${getMinutes(total)} minutes, ${getSeconds(
            total
          )} seconds`}
        >
          {formatTime(total)}
        </div>
      </div>

      <Chart
        options={options}
        series={[(value / total) * 100]}
        type="radialBar"
        width="100%"
      />

      <div
        className="text-white text-4xl lg:text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        aria-label={`Time remaining: ${getMinutes(value)} minutes, ${getSeconds(
          value
        )} seconds`}
      >
        <ContentEditable
          innerRef={editableRef}
          html={formatTime(value)}
          onFocus={onEditableFocus}
          onBlur={onEditableBlur}
          onKeyUp={onEditableKeyUp}
          onKeyDown={onEditableKeyDown}
          onChange={_onEditableChange}
          style={{
            // prevent shift
            fontVariantNumeric: 'tabular-nums',
          }}
        />
      </div>
    </div>
  )
}

export default RadialGauge
