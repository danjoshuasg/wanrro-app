import type { Order } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface RecentOrdersProps {
  orders: Order[]
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">ID Pedido</th>
            <th className="text-left py-3 px-4">Cliente</th>
            <th className="text-left py-3 px-4">Fecha</th>
            <th className="text-left py-3 px-4">Total</th>
            <th className="text-left py-3 px-4">Estado</th>
            <th className="text-left py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.customerName}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
              <td className="py-3 px-4">
                <Badge variant={getBadgeVariant(order.status)}>{getStatusLabel(order.status)}</Badge>
              </td>
              <td className="py-3 px-4">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function getBadgeVariant(status: string) {
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

function getStatusLabel(status: string) {
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

