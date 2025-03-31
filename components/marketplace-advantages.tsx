import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Package, HeadsetIcon as HeadsetHelp, Clock } from "lucide-react"

export default function MarketplaceAdvantages() {
  const advantages = [
    {
      title: "Precios Competitivos",
      description: "Ofrecemos los mejores precios del mercado en equipos de automatización industrial.",
      icon: CreditCard,
    },
    {
      title: "Asesoría Técnica",
      description: "Contamos con especialistas que te ayudarán a elegir la mejor solución para tu industria.",
      icon: HeadsetHelp,
    },
    {
      title: "Envío Rápido",
      description: "Entregamos tu pedido en el menor tiempo posible a cualquier parte del país.",
      icon: Package,
    },
    {
      title: "Soporte 24/7",
      description: "Servicio de atención al cliente disponible para resolver tus dudas en todo momento.",
      icon: Clock,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {advantages.map((advantage, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <advantage.icon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{advantage.title}</h3>
            <p className="text-slate-600">{advantage.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

