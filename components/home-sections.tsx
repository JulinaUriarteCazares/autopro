"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ChevronDown, Layers } from "lucide-react"
import {
  vehicleYears,
  vehicleMakes,
  vehicleModels,
  engineTypes,
} from "@/lib/data"

const mainCategories = [
  {
    id: "motor",
    name: "Motor",
    label: "ALTO RENDIMIENTO",
    image: "/categories/motor.jpg",
    large: true,
  },
  {
    id: "frenos",
    name: "Frenos",
    image: "/categories/frenos.jpg",
    large: false,
  },
  {
    id: "suspension",
    name: "Suspensión",
    image: "/categories/suspension.jpg",
    large: false,
  },
]

export function HeroSection() {
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [engine, setEngine] = useState("")

  const availableModels = make ? vehicleModels[make] || [] : []

  return (
    <section className="relative min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-engine.jpg"
          alt="Engine background"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 text-center lg:py-16">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          <span className="italic">RENDIMIENTO SIN COMPROMISOS</span>
        </h1>
        <p className="mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Componentes de grado industrial para profesionales exigentes. Encuentra
          exactamente lo que necesitas.
        </p>

        {/* Vehicle Search */}
        <div className="w-full max-w-3xl rounded-lg border border-border bg-card/90 p-4 backdrop-blur-sm md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground">
              Encuentra Tu Pieza
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Año
              </label>
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                >
                  <option value="">Seleccionar Año</option>
                  {vehicleYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Marca
              </label>
              <div className="relative">
                <select
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value)
                    setModel("")
                  }}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                >
                  <option value="">Seleccionar Marca</option>
                  {vehicleMakes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Modelo
              </label>
              <div className="relative">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                >
                  <option value="">Seleccionar Modelo</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Motor
              </label>
              <div className="relative">
                <select
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className="h-10 w-full appearance-none rounded border border-border bg-input px-3 pr-8 text-sm text-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                >
                  <option value="">Seleccionar Motor</option>
                  {engineTypes.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded bg-[#800020] px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9a0028]"
            >
              Buscar Piezas
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CategoriesSection() {
  return (
    <section className="px-4 py-8 lg:px-6">
      <div className="mb-6 flex items-center gap-2">
        <Layers className="h-4 w-4 text-[#ffb3b5]" />
        <h2 className="text-lg font-bold uppercase tracking-wide text-foreground">
          Categorías Principales
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Motor - Large Card */}
        <Link
          href="/catalogo?category=engine"
          className="group relative col-span-1 row-span-2 overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[#800020] md:col-span-1"
        >
          <div className="relative aspect-square md:aspect-auto md:h-full md:min-h-[400px]">
            <Image
              src="/categories/motor.jpg"
              alt="Motor"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4">
              <span className="mb-2 inline-flex items-center gap-1 rounded bg-[#800020] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                <Settings className="h-3 w-3" />
                Alto Rendimiento
              </span>
              <h3 className="text-2xl font-bold text-white">Motor</h3>
            </div>
          </div>
        </Link>

        {/* Frenos */}
        <Link
          href="/catalogo?category=brakes"
          className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[#800020]"
        >
          <div className="relative aspect-video">
            <Image
              src="/categories/frenos.jpg"
              alt="Frenos"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4">
              <span className="mb-1 inline-block h-2 w-2 rounded-full bg-[#ff4444]" />
              <h3 className="text-xl font-bold text-white">Frenos</h3>
            </div>
          </div>
        </Link>

        {/* Suspensión */}
        <Link
          href="/catalogo?category=suspension"
          className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-[#800020]"
        >
          <div className="relative aspect-video">
            <Image
              src="/categories/suspension.jpg"
              alt="Suspensión"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4">
              <span className="mb-1 inline-block h-2 w-2 rounded-full bg-[#44ff44]" />
              <h3 className="text-xl font-bold text-white">Suspensión</h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
