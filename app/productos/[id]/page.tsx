import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AddToCartButton from "@/components/products/add-to-cart-button"
import ProductSpecs from "@/components/products/product-specs"
import RelatedProducts from "@/components/products/related-products"
import { getProductById, getRelatedProducts } from "@/lib/data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    return notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/productos" className="text-sm hover:underline flex items-center gap-1">
          <span>← Volver al catálogo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg border">
          <div className="aspect-square relative">
            <Image
              src={product.image || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <div className="mb-2">
            <Badge>{product.category}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)} USD</div>

          <div className="mb-6">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `En stock: ${product.stock} unidades` : "Agotado"}
            </div>
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="space-y-4">
            <AddToCartButton product={product} />

            <Button variant="outline" className="w-full">
              Solicitar Cotización
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Especificaciones Técnicas</h2>
        <ProductSpecs specs={product.specs} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Productos Relacionados</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}

