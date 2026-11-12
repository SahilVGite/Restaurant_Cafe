import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Jumps to top on route change, or to the #hash target once the new page has mounted
 * (pages fade in, so we wait a moment before measuring).
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el || ++tries > 20) {
        clearInterval(timer)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 88
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }, 60)
    return () => clearInterval(timer)
  }, [pathname, hash, key])

  return null
}
