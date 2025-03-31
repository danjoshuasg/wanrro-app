"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function ProductsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Estados para los filtros
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [categories, setCategories] = useState({
    plc: false,
    logic: false,
    accessories: false,
  })
  const [brands, setBrands] = useState({
    siemens: false,
    ab: false,
    omron: false,
    schneider: false,
  })
  const [availability, setAvailability] = useState({
    inStock: false,
    all: true,
  })

  // Cargar filtros de la URL al iniciar
  useEffect(() => {
    // Evitar actualizaciones innecesarias que causan el bucle infinito
    const loadFiltersFromUrl = () => {
      // Precio
      const minPrice = searchParams.get("minPrice")
      const maxPrice = searchParams.get("maxPrice")
      if (minPrice && maxPrice) {
        setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
      }

      // Categorías
      const cats = searchParams.get("categories")
      if (cats) {
        const selectedCats = cats.split(",")
        setCategories({
          plc: selectedCats.includes("plc"),
          logic: selectedCats.includes("logic"),
          accessories: selectedCats.includes("accessories"),
        })
      }

      // Marcas
      const brandParam = searchParams.get("brands")
      if (brandParam) {
        const selectedBrands = brandParam.split(",")
        setBrands({
          siemens: selectedBrands.includes("siemens"),
          ab: selectedBrands.includes("ab"),
          omron: selectedBrands.includes("omron"),
          schneider: selectedBrands.includes("schneider"),
        })
      }

      // Disponibilidad
      const stock = searchParams.get("inStock")
      if (stock) {
        setAvailability({
          inStock: stock === "true",
          all: stock !== "true",
        })
      }
    }

    // Cargar filtros solo una vez al montar el componente
    loadFiltersFromUrl()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manejadores de cambios
  const handleCategoryChange = (category: keyof typeof categories) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleBrandChange = (brand: keyof typeof brands) => {
    setBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }))
  }

  const handleAvailabilityChange = (type: keyof typeof availability) => {
    if (type === "inStock") {
      setAvailability({
        inStock: true,
        all: false,
      })
    } else {
      setAvailability({
        inStock: false,
        all: true,
      })
    }
  }

  // Aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams()

    // Precio
    params.append("minPrice", priceRange[0].toString())
    params.append("maxPrice", priceRange[1].toString())

    // Categorías
    const selectedCategories = Object.entries(categories)
      .filter(([_, isSelected]) => isSelected)
      .map(([category]) => category)

    if (selectedCategories.length > 0) {
      params.append("categories", selectedCategories.join(","))
    }

    // Marcas
    const selectedBrands = Object.entries(brands)
      .filter(([_, isSelected]) => isSelected)
      .map(([brand]) => brand)

    if (selectedBrands.length > 0) {
      params.append("brands", selectedBrands.join(","))
    }

    // Disponibilidad
    if (availability.inStock) {
      params.append("inStock", "true")
    }

    // Actualizar URL con los filtros sin causar una recarga completa
    const url = `/productos?${params.toString()}`
    router.push(url, { scroll: false })
  }

  // Limpiar filtros
  const clearFilters = () => {
    setPriceRange([0, 1000])
    setCategories({
      plc: false,
      logic: false,
      accessories: false,
    })
    setBrands({
      siemens: false,
      ab: false,
      omron: false,
      schneider: false,
    })
    setAvailability({
      inStock: false,
      all: true,
    })
    router.push("/productos")
  }

  return (
    <div className="bg-white p-6 rounded-lg border space-y-6 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "brands"]} className="space-y-4">
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-plc" checked={categories.plc} onCheckedChange={() => handleCategoryChange("plc")} />
                <label htmlFor="cat-plc" className="text-sm">
                  PLCs
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cat-logic"
                  checked={categories.logic}
                  onCheckedChange={() => handleCategoryChange("logic")}
                />
                <label htmlFor="cat-logic" className="text-sm">
                  Lógica Cableada
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cat-accessories"
                  checked={categories.accessories}
                  onCheckedChange={() => handleCategoryChange("accessories")}
                />
                <label htmlFor="cat-accessories" className="text-sm">
                  Accesorios
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brand-siemens"
                  checked={brands.siemens}
                  onCheckedChange={() => handleBrandChange("siemens")}
                />
                <label htmlFor="brand-siemens" className="text-sm">
                  Siemens
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-ab" checked={brands.ab} onCheckedChange={() => handleBrandChange("ab")} />
                <label htmlFor="brand-ab" className="text-sm">
                  Allen-Bradley
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand-omron" checked={brands.omron} onCheckedChange={() => handleBrandChange("omron")} />
                <label htmlFor="brand-omron" className="text-sm">
                  Omron
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="brand-schneider"
                  checked={brands.schneider}
                  onCheckedChange={() => handleBrandChange("schneider")}
                />
                <label htmlFor="brand-schneider" className="text-sm">
                  Schneider Electric
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Disponibilidad</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="availability-stock"
                  checked={availability.inStock}
                  onCheckedChange={() => handleAvailabilityChange("inStock")}
                />
                <label htmlFor="availability-stock" className="text-sm">
                  En stock
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="availability-all"
                  checked={availability.all}
                  onCheckedChange={() => handleAvailabilityChange("all")}
                />
                <label htmlFor="availability-all" className="text-sm">
                  Todos los productos
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>
        Aplicar Filtros
      </Button>
    </div>
  )
}

