"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import LoginModal from "./login-modal"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function LoginButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    if (user) {
      // Si el usuario está autenticado, redirigir al dashboard
      router.push("/dashboard")
    } else {
      // Si no está autenticado, abrir el modal de login
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="bg-white text-slate-900 font-bold border-white hover:bg-slate-900 hover:text-white"
        onClick={handleClick}
      >
        <Lock className="mr-2 h-4 w-4" />
        {user ? "Acceder al Dashboard" : "Acceso a Colaboradores"}
      </Button>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

