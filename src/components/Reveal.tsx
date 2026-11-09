import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { useMotionPreferences } from '../motion/preferences'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const { enabled } = useMotionPreferences()
  const reduceMotion = !enabled
  return (
    <m.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      animate={!enabled ? { opacity: 1, y: 0 } : undefined}
      whileInView={enabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </m.div>
  )
}
