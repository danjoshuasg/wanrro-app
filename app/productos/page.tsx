import ProductsFilter from "@/components/products/products-filter"
import ProductsList from "@/components/products/products-list"
import { getProducts } from "@/lib/data"
import { Suspense } from "react"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obtener los parámetros de filtrado
  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseInt(searchParams.minPrice) : 0
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseInt(searchParams.maxPrice) : 1000

  const categories = typeof searchParams.categories === "string" ? searchParams.categories.split(",") : []

  const brands = typeof searchParams.brands === "string" ? searchParams.brands.split(",") : []

  const inStock = searchParams.inStock === "true"

  // Obtener productos y aplicar filtros
  const products = await getProducts()

  // Modificar la función filterProducts para excluir los servicios

  const filterProducts = () => {
    // Primero filtrar los servicios de la lista de productos
    const productsWithoutServices = products.filter((product) => product.category !== "Servicios")

    // Si no hay filtros, devolver todos los productos excepto servicios
    if (
      !searchParams.minPrice &&
      !searchParams.maxPrice &&
      !searchParams.categories &&
      !searchParams.brands &&
      !searchParams.inStock
    ) {
      return productsWithoutServices
    }

    return productsWithoutServices.filter((product) => {
      // Filtro de precio
      if (minPrice > 0 || maxPrice < 1000) {
        if (product.price < minPrice || product.price > maxPrice) {
          return false
        }
      }

      // Filtro de categorías
      if (categories.length > 0) {
        const categoryMatch = categories.some((cat) => {
          if (cat === "plc" && product.category === "PLCs") return true
          if (cat === "logic" && product.category === "Lógica Cableada") return true
          if (cat === "accessories" && product.category === "Accesorios") return true
          return false
        })

        if (!categoryMatch) return false
      }

      // Resto de filtros igual...
      // Filtro de marcas
      if (brands.length > 0) {
        const productBrand = product.name.toLowerCase()
        const brandMatch = brands.some((brand) => {
          return productBrand.includes(brand.toLowerCase())
        })

        if (!brandMatch) return false
      }

      // Filtro de disponibilidad
      if (inStock && product.stock <= 0) {
        return false
      }

      return true
    })
  }

  // Aplicar filtros
  const filteredProducts = filterProducts()

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="lg:sticky lg:top-16 h-fit">
          <ProductsFilter />
        </div>

        <div>
          <Suspense fallback={<div>Cargando productos...</div>}>
            <ProductsList products={filteredProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

