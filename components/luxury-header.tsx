"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, Facebook, Instagram, Music2, Phone } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

const productLinks = [
  { label: "Salle à manger", href: "/all-products?category=dining" },
  { label: "Canapés", href: "/all-products?category=sofas" },
  { label: "Chambres", href: "/all-products?category=bedrooms" },
  { label: "Armoires", href: "/all-products?category=wardrobes" },
  { label: "Accessoires", href: "/all-products?category=accessories" },
]

export default function LuxuryHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isSpecialPage = pathname.startsWith("/rooms") || pathname.startsWith("/inspirations") || pathname.startsWith("/offers") || pathname.startsWith("/all-products") || pathname.startsWith("/contact") || pathname === "/about"
  const isDarkHeaderPage = isSpecialPage && !isHomePage

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparent = isHomePage && !isScrolled
  const textColor = isTransparent || isDarkHeaderPage ? "text-white" : "text-foreground"
  const contactTextColor = isDarkHeaderPage ? "text-white" : "text-[#151515]"
  const topBarClass = "bg-[#151515] text-white"
  const mainBarClass = isDarkHeaderPage ? "bg-[#111111]/95 backdrop-blur-md" : "bg-white"
  const navBarClass = isHomePage ? "bg-white text-[#151515]" : "bg-[#34383d] text-white"

  return (
    <>
      {isHomePage && <div aria-hidden="true" className="hidden h-[196px] md:block" />}
      <header dir="ltr" className={`${isHomePage ? "fixed left-0 top-0" : "relative"} z-50 hidden w-full md:block`}>
      <div className={`flex h-10 items-center justify-center px-6 font-[var(--font-manrope)] text-sm font-medium ${topBarClass}`}>
        <div className="relative flex w-full max-w-7xl items-center justify-center">
          <div className="absolute left-0 flex items-center gap-3" aria-label="Réseaux sociaux">
            <Link href="https://facebook.com/profile.php?id=61564367111112" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-colors hover:text-[#b18a3c]"><Facebook className="h-4 w-4" /></Link>
            <Link href="https://instagram.com/art_home_tex" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors hover:text-[#b18a3c]"><Instagram className="h-4 w-4" /></Link>
            <Link href="https://tiktok.com/@art_home_textile" target="_blank" rel="noreferrer" aria-label="TikTok" className="transition-colors hover:text-[#b18a3c]"><Music2 className="h-4 w-4" /></Link>
          </div>
          <span>Exclusive Furniture Sale Up To 50% Off</span>
        </div>
      </div>

      <div className={`border-b border-black/5 transition-colors duration-300 ${mainBarClass}`}>
        <div className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-8">
          <Link href="/contact" className={`group flex items-center gap-3 ${contactTextColor} group-hover:text-[#4a3812] group-focus-visible:text-[#4a3812]`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f4ee] text-[#151515] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#4a3812] group-hover:text-[#f7f4ee] group-focus-visible:bg-[#4a3812] group-focus-visible:text-[#f7f4ee] group-hover:shadow-[0_8px_20px_rgba(74,56,18,0.2)]">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col font-[var(--font-manrope)] leading-tight">
              <span className="text-sm opacity-65">Need Help ?</span>
              <span className="mt-1 text-base font-semibold">0540 61 18 14</span>
            </span>
          </Link>

          <Link href="/" className="group absolute left-1/2 -translate-x-1/2">
            <Image src={isHomePage ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whiteart-CSZR8FXConpLYf1EUnin48SZVbyaFQ.png" : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/final-nobg-small-D3CvxrWoRG2wuLP6bom4faIF3Qii60.png"} alt="ArtHome" width={1280} height={1024} className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          <div className="ml-auto flex items-center gap-5">
            <Link href="/all-products" className="h-9 rounded-none bg-[#b18a3c] px-6 font-[var(--font-manrope)] text-xs font-semibold tracking-[0.12em] text-white transition-colors hover:bg-[#061632] md:hidden">DÉCOUVRIR</Link>
            <LanguageSwitcher textColor={textColor} compact />
          </div>
        </div>
      </div>

      <nav className={`border-b border-black/5 ${navBarClass}`} aria-label="Navigation principale">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-center gap-10 px-8 font-[var(--font-manrope)] text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-[#b18a3c]">Accueil</Link>
          <div className="group relative h-full flex items-center">
            <Link href="/all-products" className="flex items-center gap-1 transition-colors hover:text-[#b18a3c]">Produits <ChevronDown className="h-4 w-4" aria-hidden="true" /></Link>
            <div className={`invisible absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 translate-y-2 border p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${isDarkHeaderPage ? "border-white/10 bg-[#34383d] text-white" : "border-black/10 bg-white text-[#151515]"}`}>
              {productLinks.map((product) => <Link key={product.href} href={product.href} className="block px-3 py-2.5 text-sm text-inherit transition-colors hover:bg-white/10 hover:text-[#d2aa5e]">{product.label}</Link>)}
            </div>
          </div>
          <Link href="/rooms" className="transition-colors hover:text-[#b18a3c]">Pièces</Link>
          <Link href="/inspirations" className="transition-colors hover:text-[#b18a3c]">Inspirations</Link>
          <Link href="/offers" className="transition-colors hover:text-[#b18a3c]">Offres</Link>
          <Link href="/about" className="transition-colors hover:text-[#b18a3c]">À Propos</Link>
          <Link href="/contact" className="transition-colors hover:text-[#b18a3c]">Contact</Link>
        </div>
      </nav>
      </header>
    </>
  )
}
