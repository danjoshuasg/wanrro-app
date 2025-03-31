import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProductHighlights() {
  const highlights = [
    {
      id: "PLC-001",
      name: "PLC Siemens S7-1200",
      description: "Controlador lógico programable con 14 DI, 10 DO, 2 AI y comunicación Profinet",
      price: 450,
      image: "https://asset.conrad.com/media10/isa/160267/c1/-/en/802984067PI00/image.jpg?x=1440&y=1440&format=jpg&ex=1440&ey=1440&align=center",
      category: "PLCs",
    },
    {
      id: "LC-001",
      name: "Contactor Siemens 3RT2016",
      description: "Contactor industrial de alta durabilidad para control de motores y sistemas eléctricos",
      price: 40,
      image: "https://ce8dc832c.cloudimg.io/v7/_cdn_/26/7E/50/00/0/386914_1.jpg?width=640&height=480&wat=1&wat_url=_tme-wrk_%2Ftme_new.png&wat_scale=100p&ci_sign=43a16a23f97f082edb54995f7f5d679c3d71d261",
      category: "Lógica Cableada",
    },
    {
      id: "SER-001",
      name: "Instalación y Configuración",
      description: "Servicio profesional de instalación y configuración inicial de equipos de automatización",
      price: 200,
      image: "https://images.pexels.com/photos/27928760/pexels-photo-27928760/free-photo-of-hombre-industria-conexion-tecnologia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      category: "Servicios",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {highlights.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="bg-slate-100 p-6 flex justify-center">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-40 w-auto object-contain" />
          </div>
          <CardContent className="p-6">
            <div className="mb-1 text-sm text-slate-500">{product.category}</div>
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
            <p className="text-slate-600 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">${product.price}</span>
              <Button asChild>
                <Link href={`/productos/${product.id}`}>Ver Detalles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

