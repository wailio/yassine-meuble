"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/products"

interface ProductCardHomeProps {
  product: Product
  favorites: number[]
  toggleFavorite: (id: number) => void
}

export function ProductCardHome({ product, favorites, toggleFavorite }: ProductCardHomeProps) {
  const [isSelected, setIsSelected] = useState(false)
  const alternateImage = product.images[1] ?? product.images[0]
  const hasAlternateImage = product.images.length > 1
  const isFavorite = favorites.includes(product.id)

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block w-[350px] shrink-0 focus-visible:outline-none"
      onMouseEnter={() => hasAlternateImage && setIsSelected(true)}
      onMouseLeave={() => setIsSelected(false)}
      onFocus={() => hasAlternateImage && setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
    >
      <article className="relative bg-transparent">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-transparent">
          {product.discount && (
            <span className="absolute left-3 top-3 z-20 bg-black/75 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-[#F0EDE6]">
              -{product.discount}%
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-500 ease-out ${isSelected ? "scale-[1.025] opacity-0" : "opacity-100 group-hover:brightness-105"}`}
          />
          {hasAlternateImage && (
            <img
              src={alternateImage}
              alt={`${product.name}, vue alternative`}
              aria-hidden={!isSelected}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-500 ease-out ${isSelected ? "scale-[1.025] opacity-100" : "opacity-0"}`}
            />
          )}
          <button
            type="button"
            aria-label={`${isFavorite ? "Retirer" : "Ajouter"} ${product.name} ${isFavorite ? "des" : "aux"} favoris`}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              toggleFavorite(product.id)
            }}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-black/70 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
          </button>
        </div>
        <div className="flex items-baseline justify-between gap-4 bg-transparent px-1 pt-4">
          <h3 className="truncate text-sm font-medium tracking-[0.02em] text-[#F5F2EA]">{product.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-[#C9AE72]">{product.price}</span>
        </div>
      </article>
    </Link>
  )
}
