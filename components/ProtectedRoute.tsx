"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login") // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Muestra nada mientras redirige
  }

  return <>{children}</>
}