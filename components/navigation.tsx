"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, User, Package, LogOut } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import { getPendingOrders } from "@/lib/data"
// Importar el hook de autenticación
import { useAuth } from "@/hooks/use-auth"

export default function Navigation() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Añadir dentro de la función Navigation, después de las constantes existentes
  const { user, logout } = useAuth()

  // Fetch pending orders count
  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const orders = await getPendingOrders()
        setPendingOrdersCount(orders.length)
      } catch (error) {
        console.error("Error fetching pending orders:", error)
      }
    }

    fetchPendingOrders()

    // Escuchar el evento personalizado para actualizar el contador
    const handleOrderCreated = () => {
      console.log("Evento orderCreated detectado, actualizando contador...")
      fetchPendingOrders()
    }

    // Agregar el event listener
    window.addEventListener("orderCreated", handleOrderCreated)

    // Set up interval to refresh pending orders count every minute
    const intervalId = setInterval(fetchPendingOrders, 60000)

    return () => {
      clearInterval(intervalId)
      // Eliminar el event listener al desmontar
      window.removeEventListener("orderCreated", handleOrderCreated)
    }
  }, [])

  const routes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    {
      href: "/productos",
      label: "Productos",
      active: pathname === "/productos" || pathname.startsWith("/productos/"),
    },
    {
      href: "/servicios",
      label: "Servicios",
      active: pathname === "/servicios",
    },
    {
      href: "/nosotros",
      label: "Nosotros",
      active: pathname === "/nosotros",
    },
    {
      href: "/contacto",
      label: "Contacto",
      active: pathname === "/contacto",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <nav className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block font-bold text-xl">Wanrro</span>
          </Link>

          <div className="hidden md:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  route.active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Modificar la sección de botones en el navbar (dentro del div con className="flex items-center gap-4") */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="text-sm text-muted-foreground mr-2">Hola, {user.name.split(" ")[0]}</div>
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-4 w-4" />
                    {pendingOrdersCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {pendingOrdersCount}
                      </span>
                    )}
                    <span className="sr-only">Panel</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={logout} title="Cerrar sesión">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Cerrar sesión</span>
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsModalOpen(true)}>
                <User className="h-4 w-4" />
                <span className="sr-only">Iniciar sesión</span>
              </Button>
            )}
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-3 p-4 bg-background border-t">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "block py-2 px-3 text-center rounded-md",
                  route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="flex justify-between pt-4 mt-4 border-t">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-[48%] relative">
                  <User className="h-4 w-4 mr-2" />
                  Panel
                  {pendingOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {pendingOrdersCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/carrito" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-[48%]">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrito {totalItems > 0 && `(${totalItems})`}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

