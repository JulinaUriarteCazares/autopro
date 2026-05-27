"use client"

import { usePathname, useSearchParams } from "next/navigation"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { categories, products } from "@/lib/data"

function humanize(segment: string) {
  return decodeURIComponent(segment)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const routeLabels: Record<string, string> = {
  admin: "Admin",
  carrito: "Carrito",
  catalogo: "Catálogo",
  clientes: "Clientes",
  inventario: "Inventario",
  login: "Iniciar Sesión",
  pedidos: "Pedidos",
  producto: "Producto",
  registro: "Registro",
}

const categoryLabels = Object.fromEntries(
  categories.map((category) => [category.id, category.name]),
)

export default function Breadcrumbs() {
  const pathname = usePathname() || "/"
  const searchParams = useSearchParams()
  const segments = pathname.split("/").filter(Boolean)

  const items: Array<{ href: string; label: string }> = [{ href: "/", label: "Inicio" }]

  if (segments.length === 0) {
    return (
      <Breadcrumb className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Inicio</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
      </Breadcrumb>
    )
  }

  if (segments[0] === "producto") {
    items.push({ href: "/catalogo", label: "Catálogo" })

    const productId = segments[1]
    const product = products.find((item) => item.id === productId)
    items.push({
      href: pathname,
      label: product?.name ?? humanize(productId ?? "Producto"),
    })
  } else {
    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      const label = routeLabels[segment] ?? humanize(segment)
      items.push({ href, label })
    })

    const category = searchParams.get("category")
    if (segments[0] === "catalogo" && category) {
      items.push({
        href: `${pathname}?category=${category}`,
        label: categoryLabels[category] ?? humanize(category),
      })
    }
  }

  return (
    <Breadcrumb className="border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <BreadcrumbList>
          {items.map((it, i) => (
            <React.Fragment key={it.href}>
              <BreadcrumbItem>
                {i < items.length - 1 ? (
                  <BreadcrumbLink href={it.href}>{it.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{it.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </div>
    </Breadcrumb>
  )
}
