"use client"

import { useState } from "react"
import { Store, BellRing } from "lucide-react"

export default function ConfiguracionPage() {
  const [storeName, setStoreName] = useState("AUTOPRO")
  const [contactEmail, setContactEmail] = useState("admin@autopro.mx")
  const [currency, setCurrency] = useState("MXN")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">
          Ajusta la tienda, notificaciones y seguridad del panel.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Datos de la tienda</h2>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Nombre comercial</label>
              <input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Correo de contacto</label>
              <input
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Moneda</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="MXN">MXN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Notificaciones</h2>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-medium text-foreground">Alertas de stock bajo</p>
                <p className="text-sm text-muted-foreground">Recibir aviso cuando un producto llegue al mínimo.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
            </label>
            <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-medium text-foreground">Nuevos pedidos</p>
                <p className="text-sm text-muted-foreground">Notificar al equipo cuando entre una orden.</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
            </label>
            <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-4">
              <div>
                <p className="font-medium text-foreground">Resumen diario</p>
                <p className="text-sm text-muted-foreground">Enviar reporte diario por correo.</p>
              </div>
              <input type="checkbox" className="h-4 w-4 accent-primary" />
            </label>
          </div>
        </section>
      </div>
    </div>
  )
}
