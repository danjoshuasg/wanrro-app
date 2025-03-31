"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Lock, Mail, Package } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)

      if (success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
          type: "success",
        })
        onClose()
      } else {
        toast({
          title: "Error de autenticación",
          description: "Correo electrónico o contraseña incorrectos",
          type: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al intentar iniciar sesión",
        type: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="bg-slate-900 text-white p-6 flex items-center justify-center">
          <div className="bg-white/10 p-3 rounded-full mr-3">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Wanrro Automatización</h2>
            <p className="text-sm text-slate-300">Portal de Colaboradores</p>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Iniciar Sesión</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Recordarme
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <div className="mt-4 p-3 bg-slate-50 rounded-md border border-slate-100">
              <p className="text-sm text-slate-600 font-medium mb-1">Credenciales de prueba:</p>
              <div className="grid grid-cols-2 gap-1 text-xs text-slate-500">
                <div>Email:</div>
                <div className="font-mono">sasanbe@gmail.com</div>
                <div>Contraseña:</div>
                <div className="font-mono">123456</div>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

