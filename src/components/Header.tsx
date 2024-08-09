import { CloseIcon } from '@sanity/icons'

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
const emojis = ['👻', '😎', '🤙', '🐿️', '🤠']

const Header = () => {
  const boom = () => {
    jsConfetti.addConfetti({
      emojis: [emojis[(Math.random() * emojis.length) | 0]],
      confettiRadius: 5,
    })

    console.log('====================================')
    console.log(
      `Not sure why this close button was included in the design ¯\\_(ツ)_/¯`
    )
    console.log('====================================')
  }

  return (
    <div className="w-full h-[90px] lg:h-[112px] relative flex items-center justify-center text-3xl lg:text-4xl bg-brand-30 text-white">
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

export default Header
