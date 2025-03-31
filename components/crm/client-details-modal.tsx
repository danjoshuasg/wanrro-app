"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, ShoppingBag, MessageSquare, Target } from "lucide-react"
import type { Client } from "@/types"

interface ClientDetailsModalProps {
  client: Client | null
  isOpen: boolean
  onClose: () => void
}

export default function ClientDetailsModal({ client, isOpen, onClose }: ClientDetailsModalProps) {
  if (!client) return null

  // Calcular años como cliente (ejemplo)
  const yearsSince = new Date().getFullYear() - new Date(client.lastPurchase).getFullYear()

  // Datos de ejemplo para la demostración
  const mockClientData = {
    location: "Lima, Perú",
    purchaseFrequency: "1 pedido cada 3 meses",
    paymentStatus: "Sin pagos pendientes",
    favoriteProducts: [
      { name: "PLC Siemens S7-1200", quantity: 3 },
      { name: "Contactor Siemens 3RT2016", quantity: 2 },
    ],
    recentInteractions: [
      { date: "2023-10-01", type: "Llamada", description: "Interesado en nuevos contactores" },
      { date: "2023-09-20", type: "Email", description: "Envió correo solicitando cotización" },
    ],
    opportunities: {
      count: 1,
      value: 20000,
      stage: "negociación",
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalles del Cliente</DialogTitle>
        </DialogHeader>

        {/* Encabezado */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <p className="text-muted-foreground">{client.company}</p>
          </div>
          <div className="text-right">
            <Badge variant={client.status === "active" ? "success" : "secondary"}>
              {client.status === "active" ? "Activo" : "Inactivo"}
            </Badge>
            <p className="mt-1 text-sm">
              Desde {new Date().getFullYear() - yearsSince} ({yearsSince} años)
            </p>
          </div>
        </div>

        {/* Contacto */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center md:col-span-2">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{mockClientData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumen Financiero */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resumen Financiero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Gastado:</span>
                <span className="font-medium">${client.totalSpent.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Última Compra:</span>
                <span className="font-medium">{client.lastPurchase} ($1350.00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frecuencia de Compra:</span>
                <span className="font-medium">{mockClientData.purchaseFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado de Pagos:</span>
                <span className="font-medium">{mockClientData.paymentStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productos Favoritos */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Productos Favoritos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockClientData.favoriteProducts.map((product, index) => (
                <li key={index} className="flex justify-between">
                  <span>{product.name}</span>
                  <span className="font-medium">{product.quantity} unidades</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Interacciones Recientes */}
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Interacciones Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockClientData.recentInteractions.map((interaction, index) => (
                <li key={index} className="pb-2 border-b last:border-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">
                      {interaction.date}: {interaction.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{interaction.description}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Oportunidades Abiertas */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Oportunidades Abiertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {mockClientData.opportunities.count} oportunidad por $
              {mockClientData.opportunities.value.toLocaleString()} USD, en {mockClientData.opportunities.stage}
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

