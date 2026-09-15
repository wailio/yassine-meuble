'use client'

import { useEffect, useState, useRef, type PointerEvent } from 'react'
import { Star } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { PopTitle } from '@/components/pop-title'

const mobileReviews = [
  { author: "Nadia Bensaïd", rating: 5, years: "il y a 2 semaines", text: "Très belle qualité et une finition soignée. Notre nouveau salon est exactement comme nous l'imaginions." },
  { author: "Karim Amrani", rating: 4.5, years: "il y a 1 mois", text: "Une équipe professionnelle et de bons conseils. La livraison s'est bien passée et le canapé est magnifique." },
  { author: "Sonia Belkacem", rating: 4, years: "il y a 2 mois", text: "J'ai trouvé une table élégante à un prix raisonnable. Le résultat apporte beaucoup de style à notre salle à manger." },
  { author: "Yacine Haddad", rating: 3.5, years: "il y a 3 mois", text: "Le meuble correspond bien aux photos et le service était agréable. Quelques jours d'attente, mais une bonne expérience." },
  { author: "Lina Saïdi", rating: 5, years: "il y a 3 semaines", text: "Je recommande vivement Yassine Meubles. Les conseils en magasin et la qualité des matériaux sont au rendez-vous." },
  { author: "Mehdi Ferhat", rating: 4.5, years: "il y a 4 mois", text: "Des meubles modernes et confortables. L'équipe a pris le temps de nous aider à choisir les bonnes dimensions." },
  { author: "Amel Cherif", rating: 4, years: "il y a 5 mois", text: "Très contente de mon achat, avec un design sobre et une belle couleur. Le service client a été réactif." },
]

const renderStars = (rating: number, size = "h-[18px] w-[18px]") =>
  Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`${size} fill-[#b4883d] text-[#b4883d] ${index + 1 > rating ? "opacity-40" : ""}`}
      aria-hidden="true"
    />
  ))

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [desktopDragOffset, setDesktopDragOffset] = useState(0)
  const desktopDragStart = useRef<number | null>(null)
  const desktopDragOrigin = useRef(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const desktopReviews = mobileReviews

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    if (!isDesktop) return

    const interval = window.setInterval(() => {
      setDesktopIndex((previous) => (previous + 1) % desktopReviews.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [desktopReviews.length])

  const moveDesktopReview = (direction: 1 | -1) => {
    setDesktopIndex((previous) => (previous + direction + desktopReviews.length) % desktopReviews.length)
  }

  const handleDesktopPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    desktopDragStart.current = event.clientX
    desktopDragOrigin.current = desktopDragOffset
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleDesktopPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (desktopDragStart.current === null) return
    setDesktopDragOffset(desktopDragOrigin.current + event.clientX - desktopDragStart.current)
  }

  const handleDesktopPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (desktopDragStart.current !== null) {
      const distance = event.clientX - desktopDragStart.current
      if (Math.abs(distance) > 40) moveDesktopReview(distance < 0 ? 1 : -1)
    }
    desktopDragStart.current = null
    setDesktopDragOffset(0)
    setIsDragging(false)
  }
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isMobile || prefersReducedMotion) return

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % mobileReviews.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    const card = container?.firstElementChild
    if (!container || !(card instanceof HTMLElement)) return

    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0
    const scrollAmount = card.getBoundingClientRect().width + gap
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <section dir="ltr" id="offres" className="bg-[#0A0A0A] px-4 py-12 md:bg-[#f7f4ee] md:px-6 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="mb-4 flex h-auto items-start justify-center md:mb-0 md:h-auto">
            <h2 className="pt-4 text-center font-serif text-2xl font-bold text-[#F0EDE6] md:hidden md:pt-8 md:text-4xl"><PopTitle text="AVIS CLIENTS" /></h2>
            <div className="hidden w-full md:grid md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 lg:gap-20 " aria-label="Avis clients">
              <Reveal delay={80} className="relative flex h-[360px] items-end justify-center overflow-hidden">
                <div className="absolute bottom-5 h-44 w-60 rounded-full bg-[#ebe5db]" aria-hidden="true" />
                <img src="/chair.png" alt="Fauteuil et décoration Yassine Meubles" className="relative z-10 h-[360px] w-full object-contain object-bottom drop-shadow-[0_16px_14px_rgba(90,65,40,0.1)]" />
              </Reveal>
              <div className="max-w-[520px] pb-1">
                <Reveal delay={140}>
                  <div className="mb-4 inline-flex items-center gap-2 border border-[#ddd7cd] px-3 py-1 font-sans text-[11px] text-[#4c4a46]"><span className="size-1.5 rounded-full bg-[#b79357]" aria-hidden="true" />Happy Customer</div>
                  <h2 className="max-w-[480px] font-sans text-[32px] font-normal leading-[1.12] tracking-[-0.035em] text-[#292725] lg:text-[36px]"><PopTitle text="Beautiful Furniture Trusted By Modern Families" /></h2>
                </Reveal>
                <Reveal delay={220}>
                <div className="relative mt-6 overflow-hidden" onPointerDown={handleDesktopPointerDown} onPointerMove={handleDesktopPointerMove} onPointerUp={handleDesktopPointerUp} onPointerCancel={handleDesktopPointerUp} style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }} aria-live="polite">
                  <div className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-out'}`} style={{ transform: `translateX(calc(-${desktopIndex * 100}% + ${desktopDragOffset}px))` }}>
                    {desktopReviews.map((review) => (
                      <article key={review.author} className="w-full shrink-0 pr-6">
                        <div className="mb-5 flex gap-1" aria-label={`${review.rating} étoiles`}>{renderStars(review.rating)}</div>
                        <p className="min-h-[62px] max-w-[520px] font-sans text-[13px] leading-5 text-[#5f5c57]">&quot;{review.text}&quot;</p>
                        <div className="mt-7 border-t border-[#ddd7cd] pt-7">
                          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b4883d] font-serif text-sm text-[#fffaf2]" aria-hidden="true">{review.author.slice(0, 2).toUpperCase()}</div><div><p className="font-sans text-[13px] font-semibold text-[#202020]">{review.author}</p><p className="mt-0.5 font-sans text-[11px] text-[#8b8780]">{review.years}</p></div><span className="ml-auto pr-2 font-serif text-6xl leading-none text-[#ebe5db]" aria-hidden="true">&quot;</span></div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3"><button type="button" onClick={() => moveDesktopReview(-1)} aria-label="Avis précédent" className="font-sans text-xs text-[#8b8780] hover:text-[#b4883d]">←</button><div className="flex gap-1.5" aria-label="Choisir un avis">{desktopReviews.map((review, index) => <button type="button" key={review.author} onClick={() => setDesktopIndex(index)} aria-label={`Afficher l'avis de ${review.author}`} aria-current={index === desktopIndex ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${index === desktopIndex ? 'w-5 bg-[#b4883d]' : 'w-1.5 bg-[#d7d0c5]'}`} />)}</div><button type="button" onClick={() => moveDesktopReview(1)} aria-label="Avis suivant" className="font-sans text-xs text-[#8b8780] hover:text-[#b4883d]">→</button></div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={100}>
        {/* Desktop - Horizontal Scroll with Mouse Hover Controls */}
        <div className="hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-hidden scroll-smooth px-0"
            style={{ scrollBehavior: 'smooth' }}
          >
            {mobileReviews.map((review) => (
              <div key={review.author} className="flex h-52 w-[calc((100%-3.75rem)/4)] shrink-0 flex-col items-start border border-[#292929] bg-[#151515] px-6 py-6 text-left">
                <div className="mb-5 flex gap-1" aria-label={`${review.rating} étoiles`}>
                  {Array.from({ length: review.rating }, (_, index) => <Star key={index} className="h-4 w-4 fill-[#b4883d] text-[#b4883d]" aria-hidden="true" />)}
                </div>
                <p className="font-sans text-sm leading-6 text-[#d0d0d0]">&quot;{review.text}&quot;</p>
                <div className="mt-auto"><p className="font-sans text-sm font-bold text-[#F0EDE6]">{review.author}</p><p className="font-sans text-xs text-[#807b72]">{review.years}</p></div>
              </div>
            ))}
          </div>

          {/* Hover Controls - Left */}
          <button
            onClick={() => scroll('left')}
            aria-label="Avis précédents"
            className="absolute left-0 top-1/2 z-10 -translate-x-[150%] -translate-y-1/2 bg-[#F0EDE6] p-3 text-[#171717] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4883d] focus-visible:ring-offset-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Hover Controls - Right */}
          <button
            onClick={() => scroll('right')}
            aria-label="Avis suivants"
            className="absolute right-0 top-1/2 z-10 translate-x-[150%] -translate-y-1/2 bg-[#F0EDE6] p-3 text-[#171717] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4883d] focus-visible:ring-offset-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile - Simplified Carousel */}
        <div className="md:hidden">
          <div className="relative mx-auto max-w-sm px-5">
            <div className="min-h-[230px] rounded-xl border border-white/[0.08] bg-[#161616] p-5 text-center shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-opacity duration-400 ease-in-out">
              <div className="mb-5 flex justify-center gap-1" aria-label={`${mobileReviews[currentIndex].rating} étoiles`}>
                {renderStars(mobileReviews[currentIndex].rating, "h-4 w-4")}
              </div>
              <p className="text-pretty font-sans text-sm leading-6 text-[#B0B0B0]">&quot;{mobileReviews[currentIndex].text}&quot;</p>
              <div className="mt-6"><p className="font-sans text-sm font-bold text-[#F0EDE6]">{mobileReviews[currentIndex].author}</p><p className="font-sans text-xs text-[#807b72]">{mobileReviews[currentIndex].years}</p></div>
            </div>
            <button
              onClick={() => setCurrentIndex((previous) => (previous - 1 + mobileReviews.length) % mobileReviews.length)}
              aria-label="Avis précédent"
              className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-[#A8823F] p-2.5 text-white shadow-lg transition-colors hover:bg-[#8f6d32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8823F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => setCurrentIndex((previous) => (previous + 1) % mobileReviews.length)}
              aria-label="Avis suivant"
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[#A8823F] p-2.5 text-white shadow-lg transition-colors hover:bg-[#8f6d32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8823F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2" aria-label="Choisir un avis">
            {mobileReviews.map((review, index) => (
              <button key={review.author} onClick={() => setCurrentIndex(index)} aria-label={`Afficher l'avis de ${review.author}`} aria-current={index === currentIndex ? "true" : undefined} className={`h-2 w-2 rounded-full border transition-colors ${index === currentIndex ? "border-[#A8823F] bg-[#A8823F]" : "border-[#737373] bg-transparent"}`} />
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
