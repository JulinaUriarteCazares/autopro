"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertTriangle,
} from "lucide-react"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  brand: string
  price: number
  stock: number
  minStock: number
  status: "active" | "inactive" | "low_stock"
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Disco de Freno Ventilado Premium",
    sku: "BRK-001-VNT",
    category: "Frenos",
    brand: "Brembo",
    price: 1299.0,
    stock: 45,
    minStock: 10,
    status: "active",
    image: "/products/brake-rotor.jpg",
  },
  {
    id: 2,
    name: "Pastillas de Freno Cerámicas",
    sku: "BRK-002-CER",
    category: "Frenos",
    brand: "Bosch",
    price: 890.0,
    stock: 8,
    minStock: 15,
    status: "low_stock",
    image: "/products/brake-pads.jpg",
  },
  {
    id: 3,
    name: "Filtro de Aire Alto Flujo",
    sku: "FLT-001-AIR",
    category: "Filtros",
    brand: "K&N",
    price: 650.0,
    stock: 67,
    minStock: 20,
    status: "active",
    image: "/products/air-filter.jpg",
  },
  {
    id: 4,
    name: "Filtro de Aceite Premium",
    sku: "FLT-002-OIL",
    category: "Filtros",
    brand: "Bosch",
    price: 180.0,
    stock: 3,
    minStock: 25,
    status: "low_stock",
    image: "/products/oil-filter.jpg",
  },
  {
    id: 5,
    name: "Bujía de Iridio NGK",
    sku: "SPK-001-IRD",
    category: "Encendido",
    brand: "NGK",
    price: 320.0,
    stock: 120,
    minStock: 30,
    status: "active",
    image: "/products/spark-plug.jpg",
  },
  {
    id: 6,
    name: "Sistema de Admisión de Aire Frío",
    sku: "INT-001-CAI",
    category: "Admisión",
    brand: "K&N",
    price: 4500.0,
    stock: 12,
    minStock: 5,
    status: "active",
    image: "/products/cold-air-intake.jpg",
  },
  {
    id: 7,
    name: "Disco de Freno Perforado",
    sku: "BRK-003-PER",
    category: "Frenos",
    brand: "EBC",
    price: 1450.0,
    stock: 0,
    minStock: 8,
    status: "inactive",
    image: "/products/brake-rotor-2.jpg",
  },
  {
    id: 8,
    name: "Líquido de Frenos DOT 4",
    sku: "BRK-004-FLD",
    category: "Frenos",
    brand: "Castrol",
    price: 280.0,
    stock: 89,
    minStock: 20,
    status: "active",
    image: "/products/brake-fluid.jpg",
  },
]

const categories = ["Todas", "Frenos", "Filtros", "Encendido", "Admisión", "Suspensión"]

function getStatusBadge(status: Product["status"], stock: number) {
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
        Sin Stock
      </span>
    )
  }
  if (status === "low_stock") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-medium text-yellow-400">
        <AlertTriangle className="h-3 w-3" />
        Stock Bajo
      </span>
    )
  }
  return (
    <span className="inline-flex rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
      Activo
    </span>
  )
}

export default function InventarioPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "Todas" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
          <p className="text-muted-foreground">
            Gestiona tu catálogo de productos y stock
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Agregar Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {products.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Productos</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <Package className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {products.filter((p) => p.status === "active").length}
              </p>
              <p className="text-sm text-muted-foreground">En Stock</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-500/10 p-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {products.filter((p) => p.status === "low_stock" || p.stock === 0).length}
              </p>
              <p className="text-sm text-muted-foreground">Stock Bajo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre o SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Download className="h-4 w-4" />
                Exportar
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Upload className="h-4 w-4" />
                Importar
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-primary">
                      {product.sku}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          product.stock === 0
                            ? "text-red-400"
                            : product.stock <= product.minStock
                            ? "text-yellow-400"
                            : "text-foreground"
                        }`}
                      >
                        {product.stock}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        / mín {product.minStock}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(product.status, product.stock)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
              1
            </button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
              2
            </button>
            <button className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
              3
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
