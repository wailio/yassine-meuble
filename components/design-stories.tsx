"use client"

import { PopTitle } from "@/components/pop-title"

type StoryItem = {
  type: "image" | "video" | "instagram"
  src: string
  href: string
  platform: "instagram" | "facebook" | "tiktok"
  alt: string
}

const stories: StoryItem[] = [
  {
    type: "video",
    src: "/yassine-meubles-inspiration.mp4",
    href: "https://www.instagram.com/yassine.meubles/",
    platform: "instagram",
    alt: "Yassine Meubles inspiration video",
  },
  {
    type: "video",
    src: "/yassine-meubles-facebook.mp4",
    href: "https://www.facebook.com/p/Yassine-Meubles-61578165012936",
    platform: "facebook",
    alt: "Yassine Meubles Facebook inspiration",
  },
  {
    type: "video",
    src: "/yassine-meubles-tiktok.mp4",
    href: "https://www.tiktok.com/@yassine_meubles_",
    platform: "tiktok",
    alt: "Yassine Meubles TikTok inspiration",
  },
]

function PlatformIcon({ platform }: { platform: "instagram" | "facebook" | "tiktok" }) {
  return platform === "tiktok" ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M15.7 3c.4 2.2 1.6 3.7 3.8 4.1v3.1a8.1 8.1 0 0 1-3.8-1.1v6.1a5.8 5.8 0 1 1-5-5.7v3.2a2.7 2.7 0 1 0 2 2.6V3h3Z" />
    </svg>
  ) : platform === "instagram" ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  )
}

export function DesignStories() {
  return (
    <section className="bg-[#fcfbf8] px-4 py-14 md:px-5 md:py-24">
      <div className="mx-auto mb-10 max-w-[1240px] text-center md:mb-16">
        <span className="mb-3 inline-flex items-center gap-2 border border-black/10 px-3.5 py-1 text-xs text-neutral-600 md:mb-4 md:text-sm">
          <span className="size-1.5 rounded-full bg-[#b79357]" aria-hidden="true" />
          Design Stories
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-800 md:text-[2.5rem] md:leading-tight">
          <PopTitle text="Modern Living Inspirations" />
        </h2>
      </div>

      <div
        data-lenis-prevent
        className="mx-auto flex max-w-[1240px] justify-center gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-7 md:overflow-visible md:pb-0 md:[&>*]:w-[calc((100%_-_84px)/4)] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-[2/3] w-[45%] shrink-0 snap-center overflow-hidden rounded-2xl border border-black/5 shadow-sm md:aspect-[7/10] md:shrink-0 md:snap-none"
          >
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              aria-label={item.alt}
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 md:group-hover:bg-black/40" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-all duration-300 md:scale-75 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md">
                <PlatformIcon platform={item.platform} />
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="mx-auto mt-10 hidden items-center justify-center gap-2 text-sm text-neutral-700 md:flex">
        <span className="rounded-full bg-[#b79357] px-2.5 py-0.5 font-semibold text-white">info</span>
        <span>Créons ensemble quelque chose de magnifique.</span>
        <a href="https://wa.me/213558646054" target="_blank" rel="noopener noreferrer" className="font-medium text-[#a77f3f] underline underline-offset-2 transition-colors hover:text-[#85632e]">
          envoyer un message WhatsApp
        </a>
      </div>
    </section>
  )
}
