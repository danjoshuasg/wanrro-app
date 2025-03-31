import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Optimiza tus procesos con nuestros PLCs y soluciones de control
            </h1>
            <p className="max-w-[600px] text-slate-300 md:text-xl">
              Equipos de alta calidad, soporte técnico especializado y los mejores precios del mercado en un solo lugar.
              Impulsa tu industria con tecnología de vanguardia.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="transition-transform hover:scale-115">
                <Link href="/productos">Explorar Catálogo</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-[#051e3e] font-bold hover:text-white hover:bg-slate-800"
                asChild
                size="lg"
              >
                <Link href="/contacto">Solicitar Asesoría</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-transparent z-10" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600/20 w-96 h-96 rounded-full blur-3xl" />
            <div className="relative z-20 flex items-center justify-center h-full">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <img
                  src="https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="PLC Siemens S7-1200"
                  className="w-auto h-auto max-h-[300px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

