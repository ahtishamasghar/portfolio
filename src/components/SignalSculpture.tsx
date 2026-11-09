import { useEffect, useRef } from 'react'
import { useMotionPreferences } from '../motion/preferences'

// An original, lightweight wire sculpture. No model, texture, or WebGL dependency.
export function SignalSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { enabled } = useMotionPreferences()
  const phaseRef = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let width = 0
    let height = 0
    let frame = 0
    let last = 0
    let visible = true
    let pointerX = 0
    let pointerY = 0
    let smoothX = 0
    let smoothY = 0
    const tau = Math.PI * 2

    const draw = () => {
      context.clearRect(0, 0, width, height)
      const time = phaseRef.current
      // Rotate the form through depth so the movement is visible without interaction.
      const tilt = 0.65 + Math.sin(time * 0.4) * 0.18 + smoothY * 0.13
      const rotation = -0.48 + Math.sin(time * 0.24) * 0.18 + smoothX * 0.13
      const spin = time * 0.24
      const cosSpin = Math.cos(spin)
      const sinSpin = Math.sin(spin)
      const cosTilt = Math.cos(tilt)
      const sinTilt = Math.sin(tilt)
      const cosRotation = Math.cos(rotation)
      const sinRotation = Math.sin(rotation)
      const scale = Math.min(width, height) * 0.205
      const point = (u: number, v: number) => {
        const ripple = 0.035 * Math.sin(u * 3 + time * 0.45)
        const radius = 1.25 + (0.48 + ripple) * Math.cos(v)
        const rawX = radius * Math.cos(u)
        const y = radius * Math.sin(u)
        const rawZ = (0.48 + ripple) * Math.sin(v)
        const x = rawX * cosSpin + rawZ * sinSpin
        const z = -rawX * sinSpin + rawZ * cosSpin
        const py = y * cosTilt - z * sinTilt
        const pz = y * sinTilt + z * cosTilt
        const px = x * cosRotation - py * sinRotation
        const ry = x * sinRotation + py * cosRotation
        const perspective = 4.8 / (4.8 - pz)
        return {
          x: width / 2 + px * scale * perspective,
          y: height / 2 + ry * scale * perspective,
          z: pz,
        }
      }
      const gradient = context.createLinearGradient(width * 0.15, 0, width * 0.9, height)
      gradient.addColorStop(0, '#b9fff2')
      gradient.addColorStop(0.35, '#68e1d2')
      gradient.addColorStop(0.7, '#7bbcff')
      gradient.addColorStop(1, '#d5f9ed')
      context.strokeStyle = gradient
      context.lineWidth = 0.7
      for (let ring = 0; ring < 38; ring++) {
        const v = (ring / 38) * tau
        context.beginPath()
        for (let step = 0; step <= 100; step++) {
          const p = point((step / 100) * tau, v)
          if (step === 0) context.moveTo(p.x, p.y)
          else context.lineTo(p.x, p.y)
        }
        context.globalAlpha = 0.28 + 0.48 * ((Math.sin(v) + 1) / 2)
        context.stroke()
      }
      for (let ring = 0; ring < 64; ring++) {
        const u = (ring / 64) * tau
        context.beginPath()
        for (let step = 0; step <= 40; step++) {
          const p = point(u, (step / 40) * tau)
          if (step === 0) context.moveTo(p.x, p.y)
          else context.lineTo(p.x, p.y)
        }
        context.globalAlpha = 0.25 + 0.45 * ((Math.sin(u) + 1) / 2)
        context.stroke()
      }
      // Small points follow the surface, rather than flashing or simulating activity.
      for (let index = 0; index < 8; index++) {
        const p = point(index * 0.78 + time * 0.075, index * 1.93)
        context.globalAlpha = 0.55 + (p.z + 1.8) / 9
        context.fillStyle = '#e2fff5'
        context.beginPath()
        context.arc(p.x, p.y, 1.5, 0, tau)
        context.fill()
      }
      context.globalAlpha = 1
    }
    const resize = () => {
      const box = canvas.getBoundingClientRect()
      width = box.width
      height = box.height
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      draw()
    }
    const tick = (now: number) => {
      if (!enabled || !visible || document.hidden) {
        frame = 0
        return
      }
      if (now - last >= 1000 / 24) {
        phaseRef.current += Math.min((now - last) / 1000, 0.06)
        smoothX += (pointerX - smoothX) * 0.045
        smoothY += (pointerY - smoothY) * 0.045
        last = now
        draw()
      }
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!frame && enabled && visible && !document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const box = canvas.getBoundingClientRect()
      pointerX = (event.clientX - box.left) / box.width - 0.5
      pointerY = (event.clientY - box.top) / box.height - 0.5
    }
    const resetPointer = () => {
      pointerX = 0
      pointerY = 0
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    const resizeObserver = new ResizeObserver(resize)
    observer.observe(canvas)
    resizeObserver.observe(canvas)
    canvas.addEventListener('pointermove', onPointer)
    canvas.addEventListener('pointerleave', resetPointer)
    document.addEventListener('visibilitychange', start)
    resize()
    start()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointer)
      canvas.removeEventListener('pointerleave', resetPointer)
      document.removeEventListener('visibilitychange', start)
    }
  }, [enabled])
  return <canvas ref={canvasRef} className="signal-sculpture" aria-hidden="true" />
}
