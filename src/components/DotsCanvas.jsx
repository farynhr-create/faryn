import { useEffect, useRef } from 'react'
import './DotsCanvas.css'

const PARTICLE_COUNT = 110
const CONNECT_DIST = 130     // particle-to-particle connection threshold
const MOUSE_DIST = 210       // mouse influence radius
const SPEED = 0.28
const ACCENT = [201, 169, 110]

function lerp(a, b, t) { return a + (b - a) * t }

class Particle {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.reset()
  }
  reset() {
    this.x  = Math.random() * this.w
    this.y  = Math.random() * this.h
    this.vx = (Math.random() - 0.5) * SPEED
    this.vy = (Math.random() - 0.5) * SPEED
    this.r  = Math.random() * 1.2 + 0.5
    this.baseAlpha = Math.random() * 0.35 + 0.08
    this.alpha = this.baseAlpha
    this.targetAlpha = this.baseAlpha
  }
  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > this.w) this.vx *= -1
    if (this.y < 0 || this.y > this.h) this.vy *= -1
    this.alpha = lerp(this.alpha, this.targetAlpha, 0.08)
    this.targetAlpha = this.baseAlpha
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${this.alpha})`
    ctx.fill()
  }
}

export default function DotsCanvas() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ particles: [], mouse: { x: null, y: null }, raf: null })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      state.particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas.width, canvas.height))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { particles, mouse } = state

      // 1. Update positions
      particles.forEach(p => p.update())

      // 2. Particle-to-particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const t = 1 - dist / CONNECT_DIST
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${t * 0.12})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // 3. Mouse connections — artistic burst
      if (mouse.x !== null) {
        // Draw cursor dot
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 6)
        grad.addColorStop(0, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0.9)`)
        grad.addColorStop(1, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        particles.forEach(p => {
          const dx   = p.x - mouse.x
          const dy   = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DIST) {
            const t = 1 - dist / MOUSE_DIST
            // Boost dot brightness
            p.targetAlpha = Math.min(0.95, p.baseAlpha + t * 0.7)

            // Line to mouse
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${t * 0.4})`
            ctx.lineWidth = t * 0.8
            ctx.stroke()

            // Dot glow
            if (t > 0.5) {
              const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
              glow.addColorStop(0, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${t * 0.3})`)
              glow.addColorStop(1, `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},0)`)
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
              ctx.fillStyle = glow
              ctx.fill()
            }
          }
        })
      }

      // 4. Draw dots on top
      particles.forEach(p => p.draw(ctx))

      state.raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      state.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { state.mouse = { x: null, y: null } }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    draw()

    return () => {
      observer.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(state.raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="dots-canvas" aria-hidden="true" />
}
