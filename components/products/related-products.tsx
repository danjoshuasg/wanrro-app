import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="bg-slate-100 p-4 flex justify-center">
            <img
              src={product.image || "/placeholder.svg?height=120&width=120"}
              alt={product.name}
              className="h-32 w-auto object-contain"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-bold mb-1 line-clamp-1 text-sm">{product.name}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold">${product.price}</span>
            </div>
            <Button asChild className="w-full" size="sm">
              <Link href={`/productos/${product.id}`}>Ver Detalles</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

