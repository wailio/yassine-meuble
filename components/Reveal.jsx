"use client"

import { useReveal } from "@/hooks/useReveal"

export function Reveal({ children, delay = 0, className = "", variant = "fade", immediate = false }) {
  const { ref, isVisible: observedVisible } = useReveal()
  const isShown = immediate || observedVisible

  return (
    <div
      ref={ref}
      className={`reveal-luxury ${className} ${immediate ? "animate-fade-in-up" : ""}`.trim()}
      style={{
        opacity: isShown ? 1 : 0,
        transform: isShown ? "translateY(0) scale(1)" : "translateY(28px) scale(0.975)",
        filter: isShown ? "blur(0)" : "blur(3px)",
        transition: `opacity 1.35s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.35s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 1.35s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
