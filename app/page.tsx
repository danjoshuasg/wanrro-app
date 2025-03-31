import Link from "next/link"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import ProductHighlights from "@/components/product-highlights"
import MarketplaceAdvantages from "@/components/marketplace-advantages"
import TestimonialsSection from "@/components/testimonials-section"

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Productos Destacados</h2>
          <ProductHighlights />
        </div>
      </section>

      <section className="py-10 md:py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Ventajas de Nuestro Marketplace</h2>
          <MarketplaceAdvantages />
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Clientes Opinan</h2>
          <TestimonialsSection />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para optimizar tus procesos industriales?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Explora nuestro catálogo completo de PLCs y dispositivos de automatización industrial. Contamos con asesoría
            técnica especializada y los mejores precios del mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="transition-transform hover:scale-115">
              <Link href="/productos" className="px-8">
                Explorar Catálogo
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-[#051e3e] font-bold border-white hover:text-white hover:bg-slate-800"
              asChild
            >
              <Link href="/contacto" className="px-8">
                Solicitar Asesoría
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

