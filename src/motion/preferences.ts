import { createContext, useContext } from 'react'

export const MotionPreferences = createContext({ enabled: true, reduced: false, toggle: () => {} })
export const useMotionPreferences = () => useContext(MotionPreferences)
