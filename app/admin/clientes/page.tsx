"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Users,
  UserPlus,
  Star,
} from "lucide-react"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  lastOrder: string
  status: "active" | "inactive"
  tier: "regular" | "vip" | "wholesale"
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+52 55 1234 5678",
    orders: 24,
    totalSpent: 45680.0,
    lastOrder: "2024-01-15",
    status: "active",
    tier: "vip",
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@email.com",
    phone: "+52 55 2345 6789",
    orders: 12,
    totalSpent: 18920.0,
    lastOrder: "2024-01-14",
    status: "active",
    tier: "regular",
  },
  {
    id: 3,
    name: "Taller Mecánico Express",
    email: "compras@tallerexpress.com",
    phone: "+52 55 3456 7890",
    orders: 156,
    totalSpent: 284500.0,
    lastOrder: "2024-01-15",
    status: "active",
    tier: "wholesale",
  },
  {
    id: 4,
    name: "Roberto Sánchez",
    email: "roberto.sanchez@email.com",
    phone: "+52 55 4567 8901",
    orders: 8,
    totalSpent: 12450.0,
    lastOrder: "2024-01-10",
    status: "active",
    tier: "regular",
  },
  {
    id: 5,
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+52 55 5678 9012",
    orders: 3,
    totalSpent: 4890.0,
    lastOrder: "2023-12-20",
    status: "inactive",
    tier: "regular",
  },
  {
    id: 6,
    name: "AutoServicio Rápido SA",
    email: "pedidos@autoservicio.com",
    phone: "+52 55 6789 0123",
    orders: 89,
    totalSpent: 156780.0,
    lastOrder: "2024-01-13",
    status: "active",
    tier: "wholesale",
  },
]

const tierConfig = {
  regular: { label: "Regular", color: "bg-gray-500/20 text-gray-400" },
  vip: { label: "VIP", color: "bg-primary/20 text-primary" },
  wholesale: { label: "Mayoreo", color: "bg-blue-500/20 text-blue-400" },
}

export default function ClientesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tierFilter, setTierFilter] = useState<string>("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTier = tierFilter === "all" || customer.tier === tierFilter
    return matchesSearch && matchesTier
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tu base de clientes y sus pedidos
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <UserPlus className="h-4 w-4" />
          Agregar Cliente
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {customers.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Clientes</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-500/10 p-2">
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {customers.filter((c) => c.tier === "vip").length}
              </p>
              <p className="text-sm text-muted-foreground">Clientes VIP</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {customers.filter((c) => c.tier === "wholesale").length}
              </p>
              <p className="text-sm text-muted-foreground">Mayoristas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="all">Todos los tipos</option>
                <option value="regular">Regular</option>
                <option value="vip">VIP</option>
                <option value="wholesale">Mayoreo</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Download className="h-4 w-4" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Pedidos</th>
                <th className="px-4 py-3 font-medium">Total Gastado</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Último Pedido</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-medium text-foreground">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-sm text-foreground">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {customer.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {customer.orders}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    ${customer.totalSpent.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${tierConfig[customer.tier].color}`}
                    >
                      {tierConfig[customer.tier].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {customer.lastOrder}
                  </td>
                  <td className="px-4 py-3">
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredCustomers.length} de {customers.length} clientes
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
