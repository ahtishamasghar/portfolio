import { useEffect } from 'react'

// The browser can resolve a fragment before React has mounted its target.
// Wait for loading and fonts so deep links land correctly on a fresh visit.
export function useInitialAnchor() {
  useEffect(() => {
    const initialHash = window.location.hash
    if (!initialHash) return
    let cancelled = false
    let frame = 0
    const align = async () => {
      await document.fonts.ready
      if (cancelled) return
      frame = requestAnimationFrame(() => {
        if (cancelled || window.location.hash !== initialHash) return
        let id: string
        try {
          id = decodeURIComponent(initialHash.slice(1))
        } catch {
          return
        }
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
    }
    if (document.readyState === 'complete') void align()
    else window.addEventListener('load', align, { once: true })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('load', align)
    }
  }, [])
}
