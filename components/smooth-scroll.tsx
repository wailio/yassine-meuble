"use client"

import { ReactLenis, type LenisRef } from "lenis/react"
import { cancelFrame, frame } from "framer-motion"
import { useEffect, useRef } from "react"

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp)
    }

    frame.update(update, true)

    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.2,
      }}
    />
  )
}
