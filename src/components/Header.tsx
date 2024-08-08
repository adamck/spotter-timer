import { CloseIcon } from '@sanity/icons'

import JSConfetti from 'js-confetti'
import { useCallback } from 'react'
const jsConfetti = new JSConfetti()

const Header = () => {
  const boom = useCallback(() => {
    jsConfetti.addConfetti({
      emojis: ['🤷‍♂️'],
      confettiRadius: 5,
    })

    console.log('====================================')
    console.log(
      `Wasn't sure why this close button was included in the design ¯\\_(ツ)_/¯`
    )
    console.log('====================================')
  }, [])

  return (
    <div className="w-full h-[112px] relative flex items-center justify-center text-4xl bg-brand-30 text-white">
      Timer
      <button
        tabIndex={0}
        type="button"
        className="absolute right-4"
        onClick={boom}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default Header
