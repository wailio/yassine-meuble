"use client"

import { motion, type Variants } from "framer-motion"

interface PopTitleProps {
  text: string
  splitBy?: "word" | "char"
  className?: string
  delay?: number
}

export function PopTitle({ text, splitBy = "word", className = "", delay = 0 }: PopTitleProps) {
  const pieces = splitBy === "char" ? Array.from(text) : text.split(" ")
  const stagger = splitBy === "char" ? 0.025 : 0.085

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 34, scale: 0.72, rotateX: 65, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 13,
        stiffness: 190,
        mass: 0.8,
      },
    },
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap [perspective:900px] ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {pieces.map((piece, i) => (
        <motion.span key={`${piece}-${i}`} variants={item} className="inline-block origin-bottom [backface-visibility:hidden]">
          {piece}
          {splitBy === "word" && i !== pieces.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}
