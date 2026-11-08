import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

// Brand marks are kept separate from Lucide's interface icons.
export function Github({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8a3.3 3.3 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8A5.3 5.3 0 0 0 19 5.1a5 5 0 0 0-.1-3.7S17.8 1 15 2.8a13 13 0 0 0-7 0C5.2 1 4.1 1.4 4.1 1.4A5 5 0 0 0 4 5.1a5.3 5.3 0 0 0-1.3 3.7c0 5.3 3.2 6.5 6.2 6.8a3.3 3.3 0 0 0-.9 2.6V22" /></svg>
}

export function Linkedin({ size = 24, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7m5 0v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="7" cy="7" r=".6" /></svg>
}
