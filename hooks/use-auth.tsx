"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir el tipo de usuario
export interface User {
  id: string
  email: string
  name: string
  role: string
}

// Definir el tipo del contexto de autenticación
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Datos mock para autenticación
const MOCK_USERS = [
  {
    id: "1",
    email: "sasanbe@gmail.com",
    password: "123456",
    name: "Saúl Santivañez Bernardo",
    role: "admin",
  },
  {
    id: "2",
    email: "jafet@wanrro.com",
    password: "123456",
    name: "Jafet Santivañez",
    role: "manager",
  },
  {
    id: "3",
    email: "dan@wanrro.com",
    password: "123456",
    name: "Dan Santivañez",
    role: "staff",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Buscar usuario en datos mock
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Crear objeto de usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  // Función de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

