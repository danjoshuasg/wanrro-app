import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface ProductsListProps {
  products: Product[]
}

export default function ProductsList({ products }: ProductsListProps) {
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">Intente cambiar los filtros de búsqueda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="bg-slate-100 p-4 flex justify-center">
            <img
              src={product.image || "/placeholder.svg?height=160&width=160"}
              alt={product.name}
              className="h-40 w-auto object-contain"
            />
          </div>
          <CardContent className="p-4">
            <div className="mb-1 text-xs text-slate-500">{product.category}</div>
            <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-slate-600 mb-3 text-sm line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-bold">${product.price}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
              </span>
            </div>

            <Button asChild className="w-full">
              <Link href={`/productos/${product.id}`}>Ver Detalles</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

