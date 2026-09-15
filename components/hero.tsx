"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Truck, Check } from "lucide-react"
import { Reveal } from "@/components/Reveal"
import { PopTitle } from "@/components/pop-title"
import { useLanguage } from "@/components/language-provider"

export default function Hero() {
  const { locale } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    "/images/home-hero-bedroom-1.png",
    "/images/home-hero-bedroom-2.png",
    "/images/home-hero-bedroom-3.png",
  ]
  const mobileHeroImages = [
    "/images/home-hero-salon-1.png",
    "/images/home-hero-salon-2.png",
    "/images/home-hero-salon-3.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative">
      {/* Main Hero with Rolling Images */}
      <div className="relative w-full h-[520px] md:h-[700px] lg:h-[850px] overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0 md:hidden">
          {mobileHeroImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Mobile hero room ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="absolute inset-0 hidden md:block">
          {heroImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`Hero room ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,21,38,0.15)_0%,rgba(13,21,38,0.55)_100%)]"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-8 text-center md:px-6 md:pb-0">
          <div className="flex max-w-3xl flex-col items-center">
            <Reveal delay={0}>
              <p className="font-sans text-[4px] font-semibold tracking-[1.5px] text-white [text-shadow:1px_0_0_#c9a24b,-1px_0_0_#c9a24b,0_1px_0_#c9a24b,0_-1px_0_#c9a24b] md:text-[13px] md:tracking-[5px]">YASSINE MEUBLES</p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-1 text-balance leading-none md:mt-[22px]">
                <span className="block font-[family-name:var(--font-playfair)] text-[17px] font-normal leading-tight text-[#f5f2ea] md:text-[30px]"><PopTitle text="Meubles uniques pour" /></span>
                <span className={`relative mt-0 inline-block px-1 pb-2 font-normal leading-none text-[#d4af5f] [text-shadow:0_2px_12px_rgba(13,21,38,0.6)] md:mt-2 md:pb-8 ${locale === "ar" ? "font-[family-name:var(--font-amiri)] text-[clamp(2.5rem,11vw,4.8rem)] md:text-[4.5rem]" : "font-[family-name:var(--font-great-vibes)] text-[clamp(2.6rem,12vw,5.5rem)]"}`}>
                  <PopTitle text="espaces modernes" />
                  <svg aria-hidden="true" viewBox="0 0 360 34" className="hero-underline absolute bottom-0 left-1/2 h-5 w-[88%] -translate-x-1/2 overflow-visible md:h-7 md:w-[115%]">
                    <path d="M7 18 C55 5, 83 28, 128 17 S205 6, 246 18 S306 27, 353 10" fill="none" stroke="#c9a24b" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-3 max-w-[270px] font-sans text-xs font-normal leading-5 text-[#efece4] md:mt-[38px] md:max-w-[440px] md:text-[17px] md:leading-[1.5]">
                Des meubles conçus pour transformer votre espace
              </p>
            </Reveal>
            <Reveal delay={360}>
              <Link href="/contact" className="mt-3 inline-block md:mt-7">
                <Button className="min-h-8 rounded-[2px] border-2 border-[#8a6d2f]/70 bg-[#8a6d2f]/95 px-3 py-1.5 font-serif text-[8px] font-normal uppercase tracking-[2px] text-[#f5f2ea] shadow-[0_8px_24px_rgba(3,14,32,0.38)] backdrop-blur-md transition-colors duration-250 ease-out hover:border-[#c9a24b] hover:bg-[#c9a24b] hover:text-[#0A0A0A] focus-visible:border-[#c9a24b] focus-visible:bg-[#c9a24b] focus-visible:text-[#0A0A0A] md:px-8 md:py-[13px] md:text-xs md:tracking-[3px]">
                  Nous contacter
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Image carousel indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-8 md:w-10 bg-white"
                  : "w-2 md:w-3 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Delivery Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1912] via-[#2c2418] to-[#8b7344] text-white md:px-6 md:py-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_55%)] before:opacity-60">
        <div className="relative hidden overflow-hidden py-4 md:block">
          <div className="delivery-marquee delivery-marquee-right flex w-max items-center gap-10 whitespace-nowrap">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#f8f3e8] md:text-base">
                <Check className="h-5 w-5 text-[#d1aa5c]" /> Livraison + montage dans les 58 wilayas
                <span className="text-[#d1aa5c]">✦</span>
                <Truck className="h-5 w-5 text-[#d1aa5c]" /> Gratuit sur Alger, Blida, Boumerdès, Médéa &amp; Tipaza
                <span className="text-[#d1aa5c]">◆</span>
              </span>
            ))}
          </div>
        </div>
        <div className="relative space-y-px overflow-hidden md:hidden">
          <div className="border-b border-white/10 bg-black/10 py-3">
            <div className="delivery-marquee delivery-marquee-right flex w-max items-center gap-8 whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8f3e8]">
                  <Check className="h-4 w-4 text-[#d1aa5c]" /> Livraison + montage dans les 58 wilayas <span className="text-[#d1aa5c]">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="bg-[#17130e]/35 py-3">
            <div className="delivery-marquee delivery-marquee-left flex w-max items-center gap-8 whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8f3e8]">
                  <Truck className="h-4 w-4 text-[#d1aa5c]" /> Gratuit sur Alger, Blida, Boumerdès, Médéa &amp; Tipaza <span className="text-[#d1aa5c]">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .hero-underline path {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
          animation: heroUnderlineDraw 700ms ease-out 900ms forwards;
        }
        @keyframes heroUnderlineDraw {
          to { stroke-dashoffset: 0; }
        }
        .delivery-marquee-right { animation: deliveryMarqueeRight 26s linear infinite; }
        .delivery-marquee-left { animation: deliveryMarqueeLeft 30s linear infinite; }
        @keyframes deliveryMarqueeRight {
          from { transform: translateX(-25%); }
          to { transform: translateX(0); }
        }
        @keyframes deliveryMarqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-25%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-underline path { stroke-dashoffset: 0; animation: none; }
          .delivery-marquee-right, .delivery-marquee-left { animation: none; }
        }
      `}</style>
    </section>
  )
}
