"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactoPage() {
  const [formState, setFormState] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormState({
      ...formState,
      asunto: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormState({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      })
    }, 3000)
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Contáctenos</h1>
            <p className="text-lg md:text-xl text-slate-300">
              Estamos aquí para responder a sus preguntas y ayudarle a encontrar las mejores soluciones para su
              industria.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Envíenos un Mensaje</h2>

                  {submitSuccess ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-bold mb-2">¡Mensaje Enviado!</h3>
                      <p>Gracias por contactarnos. Nos pondremos en contacto con usted a la brevedad.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre Completo</Label>
                          <Input id="nombre" name="nombre" value={formState.nombre} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="empresa">Empresa</Label>
                          <Input
                            id="empresa"
                            name="empresa"
                            value={formState.empresa}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            name="telefono"
                            value={formState.telefono}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="asunto">Asunto</Label>
                        <Select value={formState.asunto} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un asunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consulta">Consulta General</SelectItem>
                            <SelectItem value="cotizacion">Solicitud de Cotización</SelectItem>
                            <SelectItem value="soporte">Soporte Técnico</SelectItem>
                            <SelectItem value="reclamo">Reclamo</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje</Label>
                        <Textarea
                          id="mensaje"
                          name="mensaje"
                          rows={5}
                          value={formState.mensaje}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Dirección</h3>
                        <p className="text-slate-600">
                          Av. Industrial 1234
                          <br />
                          Lima, Perú
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Teléfono</h3>
                        <p className="text-slate-600">
                          +51 999 999 999
                          <br />
                          +51 (1) 555-5555
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-slate-600">
                          info@wanrro.com
                          <br />
                          ventas@wanrro.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <h3 className="font-bold mb-4">Horario de Atención</h3>
                    <div className="space-y-2 text-slate-600">
                      <div className="flex justify-between">
                        <span>Lunes - Viernes:</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábados:</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingos:</span>
                        <span>Cerrado</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">Ubicación</h3>
                    <div className="aspect-video bg-slate-200 rounded-md flex items-center justify-center">
                      <p className="text-slate-500">Mapa de ubicación</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">¿Cuál es el tiempo de entrega de los productos?</h3>
                  <p className="text-slate-600">
                    El tiempo de entrega varía según el producto y su disponibilidad en stock. Generalmente, los
                    productos en stock se entregan en 1-3 días hábiles en Lima y 3-5 días hábiles en provincias.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">¿Ofrecen garantía para sus productos?</h3>
                  <p className="text-slate-600">
                    Sí, todos nuestros productos cuentan con garantía del fabricante. El período de garantía varía según
                    el tipo de producto, desde 6 meses hasta 2 años.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">¿Realizan envíos a nivel nacional?</h3>
                  <p className="text-slate-600">
                    Sí, realizamos envíos a todo el Perú. Los costos y tiempos de envío varían según la ubicación y el
                    volumen del pedido.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">¿Ofrecen soporte técnico después de la compra?</h3>
                  <p className="text-slate-600">
                    Sí, contamos con un equipo de soporte técnico especializado que puede asistirle con cualquier
                    consulta o problema después de la compra.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

