"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Lock, Truck, RotateCcw, Shield } from "lucide-react"
import { Header, Footer } from "@/components/layout"
import { CartProvider, useCart } from "@/lib/cart-context"

function CartContent() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  const tax = subtotal * 0.08
  const shipping = subtotal >= 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  if (items.length === 0) {
    return (
      <main className="flex-1 px-4 py-12 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold italic text-[#ffb3b5]">
            CARRITO DE COMPRAS
          </h1>
          <p className="mb-8 text-muted-foreground">
            Tu carrito está vacío. ¡Explora nuestro catálogo para encontrar las
            piezas que necesitas!
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center rounded bg-[#800020] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9a0028]"
          >
            Ver Catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold italic text-[#ffb3b5]">
            CARRITO DE COMPRAS
          </h1>
          <p className="text-sm text-muted-foreground">
            Revise sus componentes de precisión antes del ensamblaje final.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border border-border bg-card p-4"
              >
                {/* Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-secondary/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 inline-flex items-center rounded bg-[#800020]/20 px-2 py-0.5 font-mono text-[10px] text-[#ffb3b5]">
                        PN: {item.sku}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Quantity & Actions */}
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded bg-secondary text-foreground transition-colors hover:bg-secondary/80"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded bg-secondary text-foreground transition-colors hover:bg-secondary/80"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-[#ffb3b5]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-bold uppercase tracking-wide text-foreground">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} artículos)
                  </span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Impuestos (Estimado)
                  </span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className={shipping === 0 ? "font-medium text-green-400" : "text-foreground"}>
                    {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-lg font-bold text-foreground">TOTAL</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">
                    ${total.toFixed(2)}
                  </span>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    USD, impuestos incluidos
                  </p>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Código Promocional
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="EJ. TALLER10"
                    className="h-10 flex-1 rounded border border-border bg-input px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                  <button className="rounded bg-secondary px-4 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary/80">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="flex w-full items-center justify-center gap-2 rounded bg-[#800020] py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9a0028]">
                <Lock className="h-4 w-4" />
                Proceder al Pago
              </button>

              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Envío gratis en pedidos {">"} $50</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <span>90 días para devoluciones</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Transacción 100% segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function CarritoPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <CartContent />
        <Footer />
      </div>
    </CartProvider>
  )
}
