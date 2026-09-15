"use client"

import { useEffect, useRef } from "react"

export function LivoraCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (window.innerWidth < 768 || reducedMotion.matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      document.documentElement.style.setProperty("--livora-pointer-x", `${targetX}px`)
      document.documentElement.style.setProperty("--livora-pointer-y", `${targetY}px`)
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      cursorRef.current?.style.setProperty("transform", `translate3d(${currentX}px, ${currentY}px, 0)`)
      ringRef.current?.style.setProperty("transform", `translate3d(${currentX}px, ${currentY}px, 0)`)
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener("pointermove", handleMove, { passive: true })
    window.addEventListener("mousemove", handleMove, { passive: true })
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <span ref={ringRef} className="livora-cursor-ring" aria-hidden="true" />
      <span ref={cursorRef} className="livora-cursor-dot" aria-hidden="true" />
    </>
  )
}
