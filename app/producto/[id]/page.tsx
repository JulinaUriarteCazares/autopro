"use client"

import { use } from "react"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
} from "lucide-react"
import { Header, Sidebar, Footer } from "@/components/layout"
import { RelatedProductCard } from "@/components/product-card"
import { CartProvider, useCart } from "@/lib/cart-context"
import { products, vehicleYears, vehicleMakes, vehicleModels } from "@/lib/data"

function ProductDetailContent({ productId }: { productId: string }) {
  const { addItem } = useCart()
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")

  const product = products.find((p) => p.id === productId) || products[4] // Default to brake pads

  const availableModels = useMemo(() => {
    if (!selectedMake) {
      return []
    }

    return vehicleModels[selectedMake] ?? []
  }, [selectedMake])

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3)

  const handleMakeChange = (make: string) => {
    setSelectedMake(make)
    setSelectedModel("")
  }

  const handleCompatibilityCheck = () => {
    if (selectedYear && selectedMake && selectedModel) {
      return
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      brand: product.brand,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <main className="flex-1 px-4 py-6 lg:ml-48 lg:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Inicio
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/catalogo" className="hover:text-foreground">
          Brakes
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium uppercase text-foreground">
          Heavy Duty Brake Pads - Cerámica
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card">
            {product.badge && (
              <div className="absolute left-4 top-4 z-10">
                <span className="inline-flex items-center gap-1 rounded bg-[#800020] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <Shield className="h-3 w-3" />
                  {product.badge}
                </span>
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className={`relative aspect-square w-20 overflow-hidden rounded border ${
                  i === 1 ? "border-[#800020]" : "border-border"
                } bg-card`}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} vista ${i}`}
                  fill
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-flex items-center rounded bg-green-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
                In Stock
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-bold text-[#ffb3b5]">
              {product.name}
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Vehicle Compatibility */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#ffb3b5]" />
              <h3 className="font-semibold text-foreground">
                Verificar Compatibilidad
              </h3>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              Asegúrate de que esta pieza se ajuste a tu vehículo exacto.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground"
                >
                  <option value="">Año</option>
                  {vehicleYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative">
                <select
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground"
                >
                  <option value="">Marca</option>
                  {vehicleMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="relative col-span-2">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {selectedMake ? "Modelo" : "Selecciona una marca primero"}
                  </option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <button
              onClick={handleCompatibilityCheck}
              className="mt-4 w-full rounded bg-secondary py-2.5 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary/80"
            >
              Comprobar Vehículo
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded bg-[#800020] py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9a0028]"
          >
            <ShoppingCart className="h-4 w-4" />
            Añadir al Carrito
          </button>

          {/* Benefits */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Truck className="h-4 w-4" />
              <span>Envío gratis sobre $50</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4" />
              <span>Devoluciones 30 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Especificaciones Técnicas
        </h2>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <tbody>
              {product.specs &&
                Object.entries(product.specs).map(([key, value], index) => (
                  <tr
                    key={key}
                    className={index % 2 === 0 ? "bg-card" : "bg-background"}
                  >
                    <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {key.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {key === "part_number" ? (
                        <span className="font-mono text-[#ffb3b5]">{value}</span>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Comprados Juntos Frecuentemente
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                sku={relatedProduct.sku}
                name={relatedProduct.name}
                price={relatedProduct.price}
                image={relatedProduct.image}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <ProductDetailContent productId={resolvedParams.id} />
        </div>
        <Footer />
      </div>
    </CartProvider>
  )
}
