import { useEffect, useRef, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import HeroComposition, {
  CONSTRUCTION_LINES,
  RED_CIRCLE_BASE,
} from './HeroComposition'
import styles from './HeroCanvas.module.css'

const MAX_DRIFT   = 10    // px, max red-circle drift
const LINE_RADIUS = 80    // px, cursor-to-line proximity (SVG space)
const LERP_FACTOR = 0.10

function lerp(a, b, t) { return a + (b - a) * t }

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1
  const len2 = dx * dx + dy * dy
  if (len2 === 0) return Math.hypot(px - x1, py - y1)
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2))
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
}

export default function HeroCanvas() {
  const reduced = useReducedMotion()

  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const springX = useSpring(motionX, { stiffness: 30, damping: 20 })
  const springY = useSpring(motionY, { stiffness: 30, damping: 20 })

  const containerRef = useRef(null)
  const canvasRef    = useRef(null)
  const svgRef       = useRef(null)
  const rafRef       = useRef(null)
  const stateRef     = useRef({
    mouse:    { x: -999, y: -999 },
    trailing: { x: -999, y: -999 },
  })

  const toSVGCoords = useCallback((screenX, screenY) => {
    const svg = svgRef.current
    if (!svg) return { x: screenX, y: screenY }
    const pt = svg.createSVGPoint()
    pt.x = screenX
    pt.y = screenY
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: screenX, y: screenY }
    return pt.matrixTransform(ctm.inverse())
  }, [])

  const rectRef = useRef(null)

  useEffect(() => {
    if (reduced) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      rectRef.current = container.getBoundingClientRect()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    const onPointerMove = (e) => {
      const rect = rectRef.current || container.getBoundingClientRect()
      stateRef.current.mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const onPointerLeave = () => {
      stateRef.current.mouse = { x: -999, y: -999 }
    }

    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave, { passive: true })

    const draw = () => {
      const { mouse, trailing } = stateRef.current
      const { width, height } = canvas.getBoundingClientRect()

      trailing.x = lerp(trailing.x, mouse.x, LERP_FACTOR)
      trailing.y = lerp(trailing.y, mouse.y, LERP_FACTOR)

      ctx.clearRect(0, 0, width, height)

      const isOnCanvas =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= width && mouse.y <= height

      /* Trailing red dot — the ghost cursor */
      if (isOnCanvas && trailing.x > 0) {
        ctx.beginPath()
        ctx.arc(trailing.x, trailing.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212, 43, 43, 0.55)'
        ctx.globalCompositeOperation = 'multiply'
        ctx.fill()
        ctx.globalCompositeOperation = 'source-over'
      }

      /* Convert mouse to SVG coords */
      const svgCoords = toSVGCoords(
        (rectRef.current?.left || 0) + mouse.x,
        (rectRef.current?.top || 0) + mouse.y,
      )

      /* Subtle line-opacity boost on proximity */
      if (svgRef.current && isOnCanvas) {
        CONSTRUCTION_LINES.forEach((line) => {
          const el = svgRef.current.querySelector(`[data-line-id="${line.id}"]`)
          if (!el) return
          const dist = distToSegment(
            svgCoords.x, svgCoords.y,
            line.x1, line.y1, line.x2, line.y2,
          )
          const target = dist < LINE_RADIUS ? 0.45 : line.baseOpacity
          const current = parseFloat(el.getAttribute('opacity') || line.baseOpacity)
          el.setAttribute('opacity', lerp(current, target, 0.12).toFixed(3))
        })
      } else if (svgRef.current) {
        CONSTRUCTION_LINES.forEach((line) => {
          const el = svgRef.current.querySelector(`[data-line-id="${line.id}"]`)
          if (!el) return
          const current = parseFloat(el.getAttribute('opacity') || line.baseOpacity)
          el.setAttribute('opacity', lerp(current, line.baseOpacity, 0.08).toFixed(3))
        })
      }

      /* Red circle drift */
      if (isOnCanvas) {
        const svg = svgRef.current
        if (svg) {
          const basePt = svg.createSVGPoint()
          basePt.x = RED_CIRCLE_BASE.cx
          basePt.y = RED_CIRCLE_BASE.cy
          const ctm = svg.getScreenCTM()
          const screen = ctm ? basePt.matrixTransform(ctm) : { x: 0, y: 0 }
          const rect = rectRef.current || { left: 0, top: 0 }
          const bx = screen.x - rect.left
          const by = screen.y - rect.top

          const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
          const dx = clamp((mouse.x - bx) * 0.18, -MAX_DRIFT, MAX_DRIFT)
          const dy = clamp((mouse.y - by) * 0.18, -MAX_DRIFT, MAX_DRIFT)
          motionX.set(dx)
          motionY.set(dy)
        }
      } else {
        motionX.set(0)
        motionY.set(0)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      ro.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reduced, toSVGCoords, motionX, motionY])

  return (
    <div ref={containerRef} className={styles.container}>
      <HeroComposition
        ref={svgRef}
        circleSpringX={springX}
        circleSpringY={springY}
      />
      {!reduced && (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
