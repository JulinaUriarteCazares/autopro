"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  sku: string
  brand: string
  name: string
  description: string
  price: number
  originalPrice?: number | null
  image: string
  stock: "in_stock" | "low_stock" | "out_of_stock"
  badge?: string | null
}

export function ProductCard({
  id,
  sku,
  brand,
  name,
  description,
  price,
  originalPrice,
  image,
  stock,
  badge,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      sku,
      brand,
      name,
      description,
      price,
      image,
    })
  }

  const stockColors = {
    in_stock: "bg-green-500/20 text-green-400",
    low_stock: "bg-[#800020]/20 text-[#ffb3b5]",
    out_of_stock: "bg-gray-500/20 text-gray-400",
  }

  const stockLabels = {
    in_stock: "CONFIRMADO",
    low_stock: "POCO STOCK",
    out_of_stock: "AGOTADO",
  }

  return (
    <Link
      href={`/producto/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[#800020]"
    >
      {/* Badge */}
      {badge && (
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              badge === "POCO STOCK"
                ? stockColors.low_stock
                : stockColors.in_stock
            }`}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & SKU */}
        <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>{brand}</span>
          <span>•</span>
          <span className="font-mono text-[#ffb3b5]">P/N: {sku}</span>
        </div>

        {/* Name */}
        <h3 className="mb-3 line-clamp-2 text-sm font-medium text-foreground">
          {name}
        </h3>

        {/* Price & Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded bg-[#800020] text-white transition-colors hover:bg-[#9a0028]"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}

interface RelatedProductCardProps {
  id: string
  sku: string
  name: string
  price: number
  image: string
}

export function RelatedProductCard({
  id,
  sku,
  name,
  price,
  image,
}: RelatedProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      sku,
      brand: "",
      name,
      description: "",
      price,
      image,
    })
  }

  return (
    <Link
      href={`/producto/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[#800020]"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <p className="mb-1 font-mono text-[10px] text-[#ffb3b5]">{sku}</p>
        <h4 className="mb-2 line-clamp-2 text-sm text-foreground">{name}</h4>

        <div className="flex items-center justify-between">
          <span className="font-bold text-white">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-[#800020] hover:text-[#ffb3b5]"
            aria-label="Añadir al carrito"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}
