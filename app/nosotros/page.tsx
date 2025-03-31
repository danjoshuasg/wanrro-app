import { Card, CardContent } from "@/components/ui/card"
import { Award, Briefcase, Target, Users } from "lucide-react"
import Image from "next/image"

export default function NosotrosPage() {
  const teamMembers = [
    {
      name: "Saul Santivañez",
      position: "CEO & Fundador",
      bio: "Ingeniero en Automatización con amplia experiencia en el sector industrial y visión estratégica para el crecimiento empresarial.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://www.linkedin.com/in/saul-santivanez/",
    },
    {
      name: "Rocio Gutarra",
      position: "Gerenta Comercial",
      bio: "Especialista en desarrollo de negocios y estrategias comerciales para el sector de automatización industrial.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://www.linkedin.com/in/rocio-gutarra/",
    },
    {
      name: "Jafet Santivañez",
      position: "Gerente de Operaciones",
      bio: "Experto en optimización de procesos y gestión de la cadena de suministro para equipos de automatización.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://www.linkedin.com/in/jafet-santivanez/",
    },
    {
      name: "Dan Santivañez",
      position: "Director de TI",
      bio: "Especialista en soluciones tecnológicas y sistemas de información para el sector industrial.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://www.linkedin.com/in/dan-santivanez/",
    },
  ]

  const values = [
    {
      title: "Excelencia",
      description: "Nos esforzamos por ofrecer productos y servicios de la más alta calidad.",
      icon: Award,
    },
    {
      title: "Innovación",
      description: "Buscamos constantemente nuevas soluciones para mejorar los procesos industriales.",
      icon: Target,
    },
    {
      title: "Compromiso",
      description: "Nos comprometemos a satisfacer las necesidades de nuestros clientes.",
      icon: Briefcase,
    },
    {
      title: "Trabajo en Equipo",
      description: "Colaboramos estrechamente con nuestros clientes para lograr los mejores resultados.",
      icon: Users,
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-lg md:text-xl text-slate-300">
              Somos especialistas en automatización industrial, comprometidos con la excelencia y la innovación
              tecnológica.
            </p>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Wanrro Automatización nació en 2015 con la visión de transformar la industria peruana a través de
                  soluciones de automatización accesibles y de alta calidad.
                </p>
                <p>
                  Lo que comenzó como una pequeña empresa de consultoría técnica, rápidamente se expandió para
                  convertirse en un proveedor integral de equipos y servicios de automatización industrial.
                </p>
                <p>
                  Hoy, nos enorgullece ser reconocidos como líderes en el mercado de PLCs y dispositivos de
                  automatización, sirviendo a cientos de empresas en todo el país.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent z-10" />
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Oficinas de Wanrro Automatización"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-slate-600">
                Proporcionar soluciones de automatización industrial de alta calidad que optimicen los procesos
                productivos de nuestros clientes, mejorando su eficiencia y competitividad en el mercado.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
              <p className="text-slate-600">
                Ser reconocidos como el principal proveedor de soluciones de automatización industrial en Perú,
                destacando por nuestra excelencia técnica, innovación constante y compromiso con el éxito de nuestros
                clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.position}</p>
                  <p className="text-slate-600 text-sm mb-3">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm bg-slate-900 text-white px-3 py-1 rounded border border-slate-900 transition-all hover:bg-slate-800 hover:border-slate-700"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Empresas que Confían en Nosotros</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex justify-center">
                <div className="h-16 w-32 bg-slate-200 rounded flex items-center justify-center">
                  <span className="text-slate-400 font-medium">Cliente {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

