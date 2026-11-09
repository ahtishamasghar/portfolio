import { useEffect, useRef } from 'react'
import artwork from '../assets/blueprint.svg?raw'

export function BlueprintVisual() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let visible = true
    const update = () => {
      element.dataset.active = String(visible && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  // Only the repository-owned SVG is injected; no user content enters this markup.
  return (
    <div
      ref={ref}
      className="blueprint-visual"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: artwork }}
    />
  )
}
