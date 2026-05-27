"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Header, Sidebar, Footer } from "@/components/layout"
import { ProductCard } from "@/components/product-card"
import { CartProvider } from "@/lib/cart-context"
import { products } from "@/lib/data"

export default function CatalogoPage() {
  const [sortBy, setSortBy] = useState("relevancia")

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 px-4 py-6 lg:ml-48 lg:px-6">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
                  Catálogo de Productos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Mostrando {products.length} resultados para &quot;Engine Components&quot;
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Ordenar por:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 appearance-none rounded border border-border bg-secondary px-3 pr-8 text-sm text-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  >
                    <option value="relevancia">Relevancia</option>
                    <option value="precio-asc">Precio: Menor a Mayor</option>
                    <option value="precio-desc">Precio: Mayor a Menor</option>
                    <option value="nombre">Nombre A-Z</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  sku={product.sku}
                  brand={product.brand}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  stock={product.stock as "in_stock" | "low_stock" | "out_of_stock"}
                  badge={product.badge}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                className="flex h-9 w-9 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-secondary"
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded bg-[#800020] text-sm font-medium text-white">
                1
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded border border-border text-sm text-muted-foreground transition-colors hover:bg-secondary">
                2
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded border border-border text-sm text-muted-foreground transition-colors hover:bg-secondary">
                3
              </button>
              <span className="px-2 text-muted-foreground">...</span>

              <button
                className="flex h-9 w-9 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:bg-secondary"
                aria-label="Página siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </CartProvider>
  )
}
