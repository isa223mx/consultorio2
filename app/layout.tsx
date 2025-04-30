import type React from "react"
import "@/app/globals.css"
import { AuthProvider } from "@/components/auth-context"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "ConsultaMed - Sistema de Consulta Médica",
  description: "Sistema de gestión para consultorios médicos",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'