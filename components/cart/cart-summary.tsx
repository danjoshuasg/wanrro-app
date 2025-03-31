"use client"

import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CartSummary() {
  const { items } = useCart()
  const [shippingCost] = useState(15) // Mock shipping cost

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.18 // 18% tax rate (IGV in Peru)
  const total = subtotal + tax + shippingCost

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>IGV (18%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

