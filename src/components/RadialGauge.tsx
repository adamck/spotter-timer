import { formatTime, getMinutes, getSeconds } from '@/lib/time'
import { useTimerStore } from '@/state/store'
import { FC, KeyboardEventHandler, useRef, useState } from 'react'
import Chart, { Props as ChartProps } from 'react-apexcharts'
import ContentEditable from 'react-contenteditable'
import { useShallow } from 'zustand/react/shallow'
import tailwindConfig from '../../tailwind.config'

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
  plotOptions: {
    radialBar: {
      hollow: {
        size: '75%',
      },
      startAngle: 0,
      endAngle: 360,
      track: {
        background: tailwindConfig.theme.extend.colors['brand-50'],
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
  stroke: {
    lineCap: 'round',
  },
  //
  // TODO: apex charts radial gauge seems to not work with
  // their markers feature which I learned too late :-/
  //
  // markers: {
  //   size: 10,
  //   colors: '#fff000',
  //   strokeColors: '#fff000',
  //   strokeOpacity: 1,
  //   fillOpacity: 1,
  //   strokeWidth: 20,
  //   shape: 'circle',
  // },
}

// they keys as well as numerals are okay to enter
const validNaN = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Tab']

type Props = {
  total: number
  value: number
}

const RadialGauge: FC<Props> = ({ value, total }) => {
  const { start, stop, set, running } = useTimerStore(
    useShallow((state) => state)
  )

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
      return
    }
    // prevent disallowed characters or numbers if at max length
    // ... while still allowing max length numbers if one or more chars are selected
    const isNumeric = !isNaN(parseInt(e.key))
    const atMax = input.current.length === 5
    const allowedChar = isNumeric || validNaN.includes(e.key)
    const hasRangeSelected = document.getSelection()?.type === 'Range'

    if ((isNumeric && atMax && !hasRangeSelected) || !allowedChar) {
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

      const split = input.current.split(':')
      let mins = 0
      let secs = 0

      if (split.length === 2) {
        mins = parseInt(split[0])
        secs = parseInt(split[1])
      } else {
        // something weird happened that shouldn't have
        // user either deleted the colon or added an extra one
        // TODO: do what?
      }

      // ~catchall~ for naughty input
      if (isNaN(mins)) mins = 0
      if (isNaN(secs)) secs = 0

      set(secs + mins * 60)

      if (wasRunning) {
        start()
      }

      editableRef.current?.blur()

      return
    }

    // Esc simply blurs the input, reverting to the last value
    if (e.code === 'Escape') {
      editableRef.current?.blur()
      return
    }

    // TODO: definitely a better way to do this but, prevent user from deleting the colon
    // one edge case easily arises if they've deleted a number character in the same edit.
    if (e.code === 'Backspace' && !e.currentTarget.innerHTML.includes(':')) {
      const badInput = e.currentTarget.innerHTML

      e.currentTarget.innerHTML =
        badInput.slice(0, 2) + ':' + badInput.slice(2, 4)
    }

    // TODO: user could do other nefarious things w the input that we're not addressing

    input.current = e.currentTarget.innerHTML
  }

  // unused but a necessary prop for ContentEditable *shrug*
  const _onEditableChange = () => null

  return (
    <div className="md:w-[320px] lg:w-[462px] relative text-center">
      {/* present total value */}
      <div className="text-xl text-gray-900 dark:text-white my-[-12px]">
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

      {/* radial gauge chart */}
      <Chart
        options={options}
        series={[(value / total) * 100]}
        type="radialBar"
        width="100%"
      />

      {/* current time presented at center of gauge */}
      <div
        className="text-gray-900 dark:text-white text-4xl lg:text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
            // prevent shift as numerals are counting down
            fontVariantNumeric: 'tabular-nums',
          }}
        />
      </div>
    </div>
  )
}

export default RadialGauge
