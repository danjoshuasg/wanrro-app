"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import type { Product } from "@/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image || "/placeholder.svg?height=100&width=100",
    })
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={handleDecrement} disabled={quantity === 1} className="h-8 w-8">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={quantity >= product.stock}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button className="w-full" onClick={handleAddToCart} disabled={product.stock <= 0}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Añadir al Carrito
      </Button>
    </div>
  )
}

