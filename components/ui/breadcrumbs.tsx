"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function humanize(segment: string) {
  return decodeURIComponent(segment)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname() || "/"
  const segments = pathname.split("/").filter(Boolean)

  const items = [{ href: "/", label: "Inicio" }].concat(
    segments.map((seg, idx) => ({
      href: "/" + segments.slice(0, idx + 1).join("/"),
      label: humanize(seg),
    })),
  )

  return (
    <Breadcrumb className="bg-background">
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
