"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Client } from "@/types"

interface PurchaseHistoryModalProps {
  client: Client | null
  isOpen: boolean
  onClose: () => void
}

interface PurchaseRecord {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
}

export default function PurchaseHistoryModal({ client, isOpen, onClose }: PurchaseHistoryModalProps) {
  if (!client) return null

  // Datos de ejemplo para el historial de compras
  const mockPurchaseHistory: PurchaseRecord[] = [
    { id: "ORD-001", date: "2023-09-15", total: 1350.0, status: "delivered" },
    { id: "ORD-000", date: "2023-06-10", total: 1500.0, status: "delivered" },
    { id: "ORD-999", date: "2023-03-05", total: 2400.5, status: "delivered" },
  ]

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive" // Rojo
      case "processing":
        return "warning" // Ámbar
      case "shipped":
        return "info" // Azul
      case "delivered":
        return "success" // Verde
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "En Proceso"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      default:
        return status
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Historial de Compras - {client.name}</DialogTitle>
        </DialogHeader>

        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID Pedido</th>
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {mockPurchaseHistory.map((purchase) => (
                <tr key={purchase.id} className="border-b">
                  <td className="py-3 px-4">{purchase.id}</td>
                  <td className="py-3 px-4">{purchase.date}</td>
                  <td className="py-3 px-4 font-medium">${purchase.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Badge variant={getBadgeVariant(purchase.status)}>{getStatusLabel(purchase.status)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <Button>Ver Todos los Pedidos</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

