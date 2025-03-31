"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"

export default function CartItemsList() {
  const { items, removeItem, updateItemQuantity } = useCart()

  if (!items.length) {
    return (
      <div className="text-center p-6">
        <p>No hay productos en el carrito</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center">
            <img
              src={item.image || "/placeholder.svg?height=100&width=100"}
              alt={item.name}
              className="max-h-20 max-w-20 object-contain"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <div className="text-sm text-slate-500">ID: {item.id}</div>
            <div className="mt-1 font-bold">${item.price.toFixed(2)}</div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-right font-bold w-24">${(item.price * item.quantity).toFixed(2)}</div>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  )
}

