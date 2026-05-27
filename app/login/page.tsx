"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Subtle grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #800020 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-lg border-t-2 border-[#800020] bg-card p-8 shadow-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#ffb3b5]">
                AUTOPRO
              </h1>
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Sistema de Gestión Central
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mecanico@taller.com"
                className="h-12 w-full rounded border border-border bg-input px-4 text-foreground placeholder:text-muted-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 w-full rounded border border-border bg-input px-4 text-foreground placeholder:text-muted-foreground focus:border-[#800020] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#800020] text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#9a0028]"
            >
              Iniciar Sesión
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿No tiene una cuenta?{" "}
            <Link href="/registro" className="font-medium text-[#ffb3b5] hover:underline">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
