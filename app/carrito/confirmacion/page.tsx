"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { saveOrder } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"

export default function ConfirmacionPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { items, clearCart } = useCart()

  useEffect(() => {
    const createOrder = async () => {
      try {
        setIsLoading(true)

        // Check if we have items in localStorage (they might be cleared already)
        const cartItems = items.length > 0 ? items : JSON.parse(localStorage.getItem("cartItems") || "[]")

        if (cartItems.length > 0) {
          // Calculate total
          const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

          // Create order object
          const order = {
            customerId: "GUEST", // En una app real, esto sería el ID del usuario logueado
            customerName: "Cliente Web", // En una app real, esto sería el nombre del usuario
            date: new Date().toISOString().split("T")[0],
            total,
            status: "pending" as const,
            items: cartItems,
          }

          // Save order to backend
          const savedOrder = await saveOrder(order)

          // Store order number
          setOrderNumber(savedOrder.id)

          // Clear cart
          clearCart()

          // Remove temporary storage
          localStorage.removeItem("cartItems")

          // Trigger a refresh of the pending orders count
          window.dispatchEvent(new CustomEvent("orderCreated"))
        } else {
          // If no items, use the order ID from URL or generate a random one
          const urlParams = new URLSearchParams(window.location.search)
          const orderId = urlParams.get("orderId")
          setOrderNumber(orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000))
        }
      } catch (error) {
        console.error("Error creating order:", error)
      } finally {
        setIsLoading(false)
      }
    }

    createOrder()
  }, [items, clearCart])

  if (isLoading) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24 max-w-3xl mx-auto flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Procesando su pedido...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24 max-w-3xl mx-auto">
      <Card className="border-green-200 shadow-md">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl md:text-3xl">¡Pedido Confirmado!</CardTitle>
          <CardDescription className="text-center text-lg">
            Gracias por su compra en Wanrro Automatización
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-slate-500">Número de Pedido</p>
              <p className="text-xl font-bold">{orderNumber}</p>
            </div>

            <div className="border-t border-b border-slate-200 py-4">
              <h3 className="font-bold mb-2">Detalles del Pedido</h3>
              <p className="text-slate-600 mb-3">
                Hemos enviado un correo electrónico a su dirección con todos los detalles de su compra, número de
                seguimiento y factura.
              </p>
              <p className="text-slate-600">
                Nuestro equipo se pondrá en contacto con usted para coordinar la entrega.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Información de Contacto</h3>
              <p className="text-slate-600 mb-1">Si tiene alguna pregunta sobre su pedido, no dude en contactarnos:</p>
              <p className="text-slate-600">
                Email: <span className="font-medium">ventas@wanrro.com</span>
              </p>
              <p className="text-slate-600">
                Teléfono: <span className="font-medium">+51 999 999 999</span>
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/productos">Seguir Comprando</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Ver Mis Pedidos</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

