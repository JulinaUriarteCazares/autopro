"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  products: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "refunded"
  date: string
}

const orders: Order[] = [
  {
    id: "ORD-2024-1847",
    customer: "Carlos Mendoza",
    email: "carlos@email.com",
    products: 3,
    total: 2450.0,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-15 14:32",
  },
  {
    id: "ORD-2024-1846",
    customer: "María García",
    email: "maria@email.com",
    products: 1,
    total: 890.0,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15 12:18",
  },
  {
    id: "ORD-2024-1845",
    customer: "Roberto Sánchez",
    email: "roberto@email.com",
    products: 5,
    total: 4120.0,
    status: "pending",
    paymentStatus: "pending",
    date: "2024-01-15 10:45",
  },
  {
    id: "ORD-2024-1844",
    customer: "Ana Martínez",
    email: "ana@email.com",
    products: 2,
    total: 1680.0,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-15 09:22",
  },
  {
    id: "ORD-2024-1843",
    customer: "Luis Hernández",
    email: "luis@email.com",
    products: 4,
    total: 3290.0,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-14 18:55",
  },
  {
    id: "ORD-2024-1842",
    customer: "Patricia López",
    email: "patricia@email.com",
    products: 2,
    total: 1540.0,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-14 16:30",
  },
]

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  processing: { label: "En Proceso", color: "bg-blue-500/20 text-blue-400", icon: Package },
  shipped: { label: "Enviado", color: "bg-purple-500/20 text-purple-400", icon: Truck },
  delivered: { label: "Entregado", color: "bg-green-500/20 text-green-400", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "bg-red-500/20 text-red-400", icon: Clock },
}

const paymentConfig = {
  paid: { label: "Pagado", color: "bg-green-500/20 text-green-400" },
  pending: { label: "Pendiente", color: "bg-yellow-500/20 text-yellow-400" },
  refunded: { label: "Reembolsado", color: "bg-gray-500/20 text-gray-400" },
}

export default function PedidosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
          <p className="text-muted-foreground">
            Gestiona y da seguimiento a los pedidos de tus clientes
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Download className="h-4 w-4" />
          Exportar Pedidos
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-500/10 p-2">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {orders.filter((o) => o.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {orders.filter((o) => o.status === "processing").length}
              </p>
              <p className="text-sm text-muted-foreground">En Proceso</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Truck className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {orders.filter((o) => o.status === "shipped").length}
              </p>
              <p className="text-sm text-muted-foreground">Enviados</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/10 p-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {orders.filter((o) => o.status === "delivered").length}
              </p>
              <p className="text-sm text-muted-foreground">Entregados</p>
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
                placeholder="Buscar por ID o cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="all">Todos los estados</option>
                <option value="pending">Pendientes</option>
                <option value="processing">En Proceso</option>
                <option value="shipped">Enviados</option>
                <option value="delivered">Entregados</option>
                <option value="cancelled">Cancelados</option>
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
                Más Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Productos</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Pago</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-primary">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {order.products} items
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      ${order.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[order.status].color}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${paymentConfig[order.paymentStatus].color}`}
                      >
                        {paymentConfig[order.paymentStatus].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredOrders.length} de {orders.length} pedidos
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
