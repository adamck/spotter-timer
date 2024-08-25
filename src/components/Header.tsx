import { CloseIcon } from '@sanity/icons'

import JSConfetti from 'js-confetti'
import { memo, useRef } from 'react'

const jsConfetti = new JSConfetti()
const emojis = ['👻', '😎', '🤙', '🐿️', '🤠', '🔎', '🐞']

const Header = () => {
  const boomCount = useRef(0)

  const boom = () => {
    jsConfetti.addConfetti({
      emojis: [emojis[(Math.random() * emojis.length) | 0]],
      confettiRadius: 5,
    })

    if (boomCount.current === 0) {
      console.log('============================')
      console.log(
        `Not sure why we need a close button so just going to have some fun with it. Hit it again.`
      )
      console.log('¯\\_(ツ)_/¯')
      console.log('============================')
    }

    boomCount.current += 1
  }

  return (
    <div className="w-full h-[90px] lg:h-[112px] relative flex items-center justify-center text-3xl lg:text-4xl bg-gray-300 dark:bg-brand-30 text-gray-900 dark:text-white">
      Timer
      <button
        tabIndex={0}
        type="button"
        className="absolute right-2 lg:right-4 text-5xl lg:text-6xl"
        onClick={boom}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default memo(Header)
