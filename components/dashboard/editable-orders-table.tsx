"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Eye, RefreshCw, Check, PlusCircle, Edit } from "lucide-react"
import OrderFormModal from "./order-form-modal"
import type { Order } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface EditableOrdersTableProps {
  orders: Order[]
}

type OrderStatus = "pending" | "processing" | "shipped" | "delivered"

export default function EditableOrdersTable({ orders: initialOrders }: EditableOrdersTableProps) {
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined)
  const [isCreating, setIsCreating] = useState(false)

  // Modificar la función updateOrderStatus para mostrar un Toast y disparar un evento
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // Obtener el pedido actual
    const currentOrder = orders.find((order) => order.id === orderId)

    // Si el estado es el mismo, no hacer nada
    if (currentOrder?.status === newStatus) return

    // Verificar si estamos cambiando a estado pendiente
    const isPendingUpdate = newStatus === "pending"

    // Actualizar el estado del pedido
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    // Mostrar Toast
    toast({
      title: "Estado actualizado",
      description: `El pedido ${orderId} ha sido actualizado a "${getStatusLabel(newStatus)}".`,
      type: "success",
    })

    // Disparar evento si el nuevo estado es pendiente
    if (isPendingUpdate) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("orderCreated"))
      }
    }
  }

  const handleCreateOrder = () => {
    setSelectedOrder(undefined)
    setIsCreating(true)
    setIsModalOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsCreating(false)
    setIsModalOpen(true)
  }

  const handleSaveOrder = (orderData: Partial<Order>) => {
    if (isCreating) {
      // Crear un nuevo pedido
      const newOrder: Order = {
        id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
        customerId: orderData.customerId || "",
        customerName: orderData.customerName || "",
        date: orderData.date || new Date().toISOString().split("T")[0],
        total: orderData.total || 0,
        status: (orderData.status as OrderStatus) || "pending",
        items: orderData.items || [],
      }
      setOrders([newOrder, ...orders])
    } else if (selectedOrder) {
      // Actualizar un pedido existente
      setOrders(orders.map((order) => (order.id === selectedOrder.id ? { ...order, ...orderData } : order)))
    }
  }

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
    <>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Listado de Pedidos</h3>
        <Button onClick={handleCreateOrder}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Pedido
        </Button>
      </div>

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
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEditOrder(order)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Actualizar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "pending")}>
                          <div className="flex items-center">
                            {order.status === "pending" && <Check className="mr-2 h-4 w-4" />}
                            <Badge variant="destructive" className="mr-2">
                              Pendiente
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                          <div className="flex items-center">
                            {order.status === "processing" && <Check className="mr-2 h-4 w-4" />}
                            <Badge variant="warning" className="mr-2">
                              En Proceso
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                          <div className="flex items-center">
                            {order.status === "shipped" && <Check className="mr-2 h-4 w-4" />}
                            <Badge variant="info" className="mr-2">
                              Enviado
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                          <div className="flex items-center">
                            {order.status === "delivered" && <Check className="mr-2 h-4 w-4" />}
                            <Badge variant="success" className="mr-2">
                              Entregado
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderFormModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrder}
      />
    </>
  )
}

