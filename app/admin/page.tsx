"use client"

import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const stats = [
  {
    name: "Ventas del Mes",
    value: "$847,290",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    name: "Pedidos",
    value: "1,284",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: ShoppingCart,
  },
  {
    name: "Productos en Stock",
    value: "12,847",
    change: "-2.4%",
    changeType: "negative" as const,
    icon: Package,
  },
  {
    name: "Ticket Promedio",
    value: "$659",
    change: "+4.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

const recentOrders = [
  {
    id: "ORD-2024-1847",
    customer: "Carlos Mendoza",
    products: 3,
    total: "$2,450.00",
    status: "Completado",
    date: "Hace 2 horas",
  },
  {
    id: "ORD-2024-1846",
    customer: "María García",
    products: 1,
    total: "$890.00",
    status: "En proceso",
    date: "Hace 3 horas",
  },
  {
    id: "ORD-2024-1845",
    customer: "Roberto Sánchez",
    products: 5,
    total: "$4,120.00",
    status: "Pendiente",
    date: "Hace 5 horas",
  },
  {
    id: "ORD-2024-1844",
    customer: "Ana Martínez",
    products: 2,
    total: "$1,680.00",
    status: "Completado",
    date: "Hace 6 horas",
  },
  {
    id: "ORD-2024-1843",
    customer: "Luis Hernández",
    products: 4,
    total: "$3,290.00",
    status: "Enviado",
    date: "Hace 8 horas",
  },
]

const lowStockProducts = [
  { name: "Disco de Freno Ventilado", sku: "BRK-001", stock: 3, minStock: 10 },
  { name: "Filtro de Aceite Premium", sku: "FLT-002", stock: 5, minStock: 15 },
  { name: "Bujía de Iridio NGK", sku: "SPK-003", stock: 8, minStock: 20 },
  { name: "Amortiguador Trasero", sku: "SUS-004", stock: 2, minStock: 8 },
]

const topProducts = [
  { name: "Disco de Freno Ventilado", sales: 245, revenue: "$171,500" },
  { name: "Filtro de Aire Alto Flujo", sales: 198, revenue: "$138,600" },
  { name: "Kit de Pastillas Cerámicas", sales: 167, revenue: "$100,200" },
  { name: "Bujía de Iridio NGK", sales: 156, revenue: "$46,800" },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Completado":
      return "bg-green-500/20 text-green-400"
    case "En proceso":
      return "bg-blue-500/20 text-blue-400"
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400"
    case "Enviado":
      return "bg-purple-500/20 text-purple-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido de vuelta. Aquí está el resumen de tu negocio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stat.change}
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="ml-1 h-4 w-4" />
                )}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">
              Pedidos Recientes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Pedido</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-primary">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {order.customer}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">
              Alerta de Stock Bajo
            </h2>
          </div>
          <div className="p-4 space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.sku}
                className="flex items-center justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">
                    {product.sku}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-sm font-bold text-red-400">
                    {product.stock} uds
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mín: {product.minStock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">
            Productos Más Vendidos
          </h2>
        </div>
        <div className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-4 rounded-lg bg-muted/50 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales} ventas · {product.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
