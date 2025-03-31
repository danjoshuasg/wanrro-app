import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Rodriguez",
      company: "Textil Andina S.A.C.",
      text: "La implementación de los PLCs Siemens que adquirimos en Wanrro Automatización incrementó nuestra eficiencia productiva en un 30%. El soporte técnico fue excepcional durante todo el proceso.",
      rating: 5,
    },
    {
      name: "María Fernandez",
      company: "Industrias Metálicas del Norte",
      text: "Excelente servicio y asesoramiento. Nos ayudaron a seleccionar los componentes ideales para nuestra línea de producción y el resultado ha superado nuestras expectativas.",
      rating: 4,
    },
    {
      name: "Roberto Gómez",
      company: "Alimentos Del Valle",
      text: "Los tiempos de entrega fueron cumplidos perfectamente y la calidad de los productos es impecable. Definitivamente seguiremos confiando en Wanrro para nuestros proyectos de automatización.",
      rating: 5,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="mb-4 italic text-slate-600">&ldquo;{testimonial.text}&rdquo;</p>
            <div>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-slate-500">{testimonial.company}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

