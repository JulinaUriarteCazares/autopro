"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Settings,
  Disc,
  Zap,
  Briefcase,
  Wrench,
  CircleDot,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Breadcrumbs from "@/components/ui/breadcrumbs"

const categories = [
  { id: "engine", name: "Engine", icon: Settings },
  { id: "brakes", name: "Brakes", icon: Disc },
  { id: "suspension", name: "Suspension", icon: CircleDot },
  { id: "electrical", name: "Electrical", icon: Zap },
  { id: "accessories", name: "Accessories", icon: Briefcase },
  { id: "tools", name: "Tools", icon: Wrench },
]

export function Header() {
  const { totalItems } = useCart()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold tracking-tight text-[#ffb3b5]">
              AUTOPRO
            </span>
          </Link>

          <div className="hidden flex-1 max-w-xl mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar por número de pieza o palabra clave..."
                className="h-9 w-full rounded-md border border-border bg-input pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground md:flex"
            >
              <MapPin className="h-4 w-4" />
              <span>Store Locator</span>
            </Link>

            <Link href="/carrito" className="relative p-2 hover:text-[#ffb3b5]">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#800020] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href="/login" className="p-2 hover:text-[#ffb3b5]">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-background">
        <Breadcrumbs />
      </div>
    </>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-14 z-40 hidden h-[calc(100vh-3.5rem)] w-48 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#ffb3b5]">
            Shop by Category
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Precision Components
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive =
              pathname === `/catalogo` ||
              pathname?.includes(category.id.toLowerCase())

            return (
              <Link
                key={category.id}
                href={`/catalogo?category=${category.id}`}
                className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors ${
                  isActive && pathname?.includes(category.id)
                    ? "bg-[#800020] text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <Link
          href="#"
          className="flex items-center justify-center rounded border border-border px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
        >
          Pro Mechanic Portal
        </Link>
      </div>
    </aside>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#ffb3b5]">AUTOPRO</span>
            <span className="text-xs text-muted-foreground">
              © 2024 Autopro Performance Parts. Industrial Grade Reliability.
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link
              href="#"
              className="uppercase tracking-wider text-muted-foreground underline hover:text-foreground"
            >
              Track Order
            </Link>
            <Link
              href="#"
              className="uppercase tracking-wider text-muted-foreground underline hover:text-foreground"
            >
              Returns & Warranty
            </Link>
            <Link
              href="#"
              className="uppercase tracking-wider text-muted-foreground underline hover:text-foreground"
            >
              Corporate Sales
            </Link>
            <Link
              href="#"
              className="uppercase tracking-wider text-muted-foreground underline hover:text-foreground"
            >
              Technical Support
            </Link>
            <Link
              href="#"
              className="uppercase tracking-wider text-muted-foreground underline hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
