import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Settings, Users } from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  const servicios = [
    {
      id: "SER-001",
      title: "Instalación y Configuración",
      description:
        "Servicio profesional de instalación y configuración inicial de equipos de automatización industrial.",
      price: 200,
      features: [
        "Instalación física de equipos",
        "Configuración de comunicaciones",
        "Pruebas básicas de funcionamiento",
        "Capacitación básica al personal",
      ],
      icon: Settings,
    },
    {
      id: "SER-002",
      title: "Programación Avanzada de PLC",
      description:
        "Desarrollo de programas personalizados para PLCs según requerimientos específicos de su proceso industrial.",
      price: 400,
      features: [
        "Análisis de requisitos",
        "Desarrollo de programa personalizado",
        "Documentación completa",
        "Pruebas exhaustivas",
        "Capacitación al personal",
      ],
      icon: Settings,
    },
    {
      id: "SER-003",
      title: "Mantenimiento Preventivo",
      description: "Servicio periódico para asegurar el correcto funcionamiento de sus sistemas de automatización.",
      price: 150,
      features: [
        "Inspección de equipos",
        "Limpieza de componentes",
        "Actualización de firmware",
        "Respaldo de programas",
        "Informe detallado",
      ],
      icon: Clock,
    },
    {
      id: "SER-004",
      title: "Capacitación Técnica",
      description: "Formación especializada para su personal en el manejo y programación de equipos de automatización.",
      price: 300,
      features: [
        "Cursos personalizados",
        "Material didáctico",
        "Ejercicios prácticos",
        "Evaluación de conocimientos",
        "Certificado de participación",
      ],
      icon: Users,
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Servicios de Automatización Industrial</h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Ofrecemos servicios especializados para optimizar sus procesos industriales, desde la instalación hasta la
              programación avanzada y mantenimiento.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="todos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="todos">Todos los Servicios</TabsTrigger>
                <TabsTrigger value="instalacion">Instalación</TabsTrigger>
                <TabsTrigger value="programacion">Programación</TabsTrigger>
                <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="todos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicios.map((servicio) => (
                  <Card key={servicio.id} className="overflow-hidden">
                    <CardHeader className="bg-slate-50 p-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <servicio.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{servicio.title}</CardTitle>
                          <p className="text-lg font-bold text-primary mt-1">${servicio.price} USD</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-slate-600 mb-4">{servicio.description}</p>
                      <ul className="space-y-2 mb-6">
                        {servicio.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" asChild>
                        <Link href="/contacto">Solicitar Servicio</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instalacion" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicios
                  .filter((s) => s.id === "SER-001")
                  .map((servicio) => (
                    <Card key={servicio.id} className="overflow-hidden">
                      <CardHeader className="bg-slate-50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <servicio.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{servicio.title}</CardTitle>
                            <p className="text-lg font-bold text-primary mt-1">${servicio.price} USD</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-slate-600 mb-4">{servicio.description}</p>
                        <ul className="space-y-2 mb-6">
                          {servicio.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" asChild>
                          <Link href="/contacto">Solicitar Servicio</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="programacion" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicios
                  .filter((s) => s.id === "SER-002" || s.id === "SER-004")
                  .map((servicio) => (
                    <Card key={servicio.id} className="overflow-hidden">
                      <CardHeader className="bg-slate-50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <servicio.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{servicio.title}</CardTitle>
                            <p className="text-lg font-bold text-primary mt-1">${servicio.price} USD</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-slate-600 mb-4">{servicio.description}</p>
                        <ul className="space-y-2 mb-6">
                          {servicio.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" asChild>
                          <Link href="/contacto">Solicitar Servicio</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="mantenimiento" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicios
                  .filter((s) => s.id === "SER-003")
                  .map((servicio) => (
                    <Card key={servicio.id} className="overflow-hidden">
                      <CardHeader className="bg-slate-50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <servicio.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{servicio.title}</CardTitle>
                            <p className="text-lg font-bold text-primary mt-1">${servicio.price} USD</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="text-slate-600 mb-4">{servicio.description}</p>
                        <ul className="space-y-2 mb-6">
                          {servicio.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" asChild>
                          <Link href="/contacto">Solicitar Servicio</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-100 py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un servicio personalizado?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Contáctenos para discutir sus necesidades específicas y desarrollar una solución a medida para su
              industria.
            </p>
            <Button size="lg" asChild>
              <Link href="/contacto">Solicitar Cotización</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

