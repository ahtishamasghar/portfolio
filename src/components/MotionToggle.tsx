import { Pause, Play } from 'lucide-react'
import { useMotionPreferences } from '../motion/preferences'

export function MotionToggle() {
  const { enabled, reduced, toggle } = useMotionPreferences()
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      disabled={reduced}
      aria-label={
        reduced
          ? 'Reduced motion enabled by your device'
          : enabled
            ? 'Pause animations'
            : 'Resume animations'
      }
      aria-pressed={!enabled}
    >
      {enabled ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
      <span>{reduced ? 'Reduced motion' : enabled ? 'Motion on' : 'Motion paused'}</span>
    </button>
  )
}
