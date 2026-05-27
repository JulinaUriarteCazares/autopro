"use client"

import { useState } from "react"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  CalendarDays,
  Download,
  ArrowUpRight,
} from "lucide-react"

const reportPeriods = {
  daily: {
    label: "Diario",
    subtitle: "Actividad de hoy",
    sales: "$28,450",
    orders: 42,
    growth: "+2.1%",
  },
  weekly: {
    label: "Semanal",
    subtitle: "Rendimiento de los últimos 7 días",
    sales: "$184,920",
    orders: 316,
    growth: "+6.8%",
  },
  monthly: {
    label: "Mensual",
    subtitle: "Resumen del mes en curso",
    sales: "$847,290",
    orders: 1_284,
    growth: "+12.5%",
  },
  yearly: {
    label: "Anual",
    subtitle: "Consolidado del año",
    sales: "$9,842,100",
    orders: 14_782,
    growth: "+18.9%",
  },
} as const

type ReportPeriod = keyof typeof reportPeriods

const metrics = [
  {
    name: "Ventas del mes",
    value: "$847,290",
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    name: "Pedidos completados",
    value: "1,284",
    change: "+8.2%",
    icon: ShoppingCart,
  },
  {
    name: "Clientes activos",
    value: "3,482",
    change: "+5.4%",
    icon: Users,
  },
  {
    name: "Crecimiento",
    value: "18.9%",
    change: "+3.1%",
    icon: TrendingUp,
  },
]

const topReports = [
  { name: "Ventas por categoría", description: "Rendimiento de frenos y motores" },
  { name: "Productos más vendidos", description: "Top 10 por volumen y utilidad" },
  { name: "Clientes recurrentes", description: "Frecuencia de compra y ticket promedio" },
  { name: "Stock crítico", description: "Alertas y reposición recomendada" },
]

const monthlyData = [
  { month: "Ene", sales: "$120k", orders: 214 },
  { month: "Feb", sales: "$134k", orders: 238 },
  { month: "Mar", sales: "$161k", orders: 279 },
  { month: "Abr", sales: "$188k", orders: 315 },
  { month: "May", sales: "$205k", orders: 338 },
]

const maxMonthlyOrders = Math.max(...monthlyData.map((row) => row.orders))

export default function ReportesPage() {
  const [period, setPeriod] = useState<ReportPeriod>("monthly")
  const periodData = reportPeriods[period]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground">
            Revisa ventas, pedidos y comportamiento de clientes.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Download className="h-4 w-4" />
          Exportar reporte
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Periodo del reporte</p>
            <p className="text-sm text-muted-foreground">Selecciona el rango que quieres revisar.</p>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as ReportPeriod)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {Object.entries(reportPeriods).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-green-400">
                {metric.change}
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Tendencia {periodData.label.toLowerCase()}</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {periodData.subtitle}.
            </p>
          </div>

          <div className="p-4">
            {period === "daily" ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Mañana", value: "$6.4k" },
                  { label: "Mediodía", value: "$8.1k" },
                  { label: "Tarde", value: "$9.7k" },
                  { label: "Noche", value: "$4.2k" },
                ].map((slot) => (
                  <div key={slot.label} className="rounded-lg border border-border bg-background p-3">
                    <p className="text-sm text-muted-foreground">{slot.label}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{slot.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {monthlyData.map((row) => (
                  <div key={row.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{row.month}</span>
                      <span className="text-muted-foreground">{row.sales} · {row.orders} pedidos</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(row.orders / maxMonthlyOrders) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-lg font-semibold text-foreground">Reportes rápidos</h2>
          </div>
          <div className="divide-y divide-border">
            {topReports.map((report) => (
              <div key={report.name} className="p-4">
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Resumen operativo</h2>
          </div>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Ventas del periodo</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{periodData.sales}</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Ticket promedio</p>
            <p className="mt-2 text-2xl font-bold text-foreground">$659</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Crecimiento</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{periodData.growth}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
