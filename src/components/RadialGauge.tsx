import Chart, { Props as ChartProps } from 'react-apexcharts'
import { FC } from 'react'

const riskColorsRadial = {
  low: '#6CD85B',
  medium: '#F1B518',
  high: '#FB3131',
}

// const opts: ChartProps = {
//   options: {
//     fill: {
//       type:
//     }
//   },
// }

const getChartOptions = (value: number, total: number): ChartProps =>
  ({
    chart: {
      height: 200,
      type: 'radialBar',
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
            show: true,
            formatter: (pct: number) => {
              const time = (pct / 100) * total
              const mins = Math.floor(time / 60)
                .toString()
                .padStart(2, '0')
              const secs = (time % 60).toString().padStart(2, '0')

              return `${mins}:${secs}`
            },
            fontSize: '52px',
            fontFamily: 'Inter',
            color: '#fff',
            offsetY: 16,
          },
        },
      },
    },

    fill: {
      type: 'solid',
      colors: ['#fff'],
    },

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
  const options = getChartOptions(value, total)

  return (
    <div className="md:w-[320px] lg:w-[462px]">
      <Chart
        options={options}
        series={[(value / total) * 100]}
        type="radialBar"
        width="100%"
      />
    </div>
  )
}

export default RadialGauge
