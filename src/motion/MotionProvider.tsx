import { useEffect, useState, type ReactNode } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { MotionPreferences } from './preferences'

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = !!useReducedMotion()
  const [paused, setPaused] = useState(false)
  const enabled = !reduced && !paused
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off'
    return () => {
      delete document.documentElement.dataset.motion
    }
  }, [enabled])
  return (
    <MotionPreferences.Provider
      value={{ enabled, reduced, toggle: () => setPaused((value) => !value) }}
    >
      <MotionConfig reducedMotion={enabled ? 'never' : 'always'}>{children}</MotionConfig>
    </MotionPreferences.Provider>
  )
}
