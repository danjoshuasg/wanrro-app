"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Order, CartItem } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface OrderFormModalProps {
  order?: Order
  isOpen: boolean
  onClose: () => void
  onSave: (order: Partial<Order>) => void
}

export default function OrderFormModal({ order, isOpen, onClose, onSave }: OrderFormModalProps) {
  const { toast } = useToast()
  const isEditing = !!order
  const [formData, setFormData] = useState<Partial<Order>>({
    customerId: "",
    customerName: "",
    date: new Date().toISOString().split("T")[0],
    total: 0,
    status: "pending",
    items: [],
  })
  const [date, setDate] = useState<Date | undefined>(isEditing ? new Date(order?.date || "") : new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newItem, setNewItem] = useState<Partial<CartItem>>({
    id: "",
    name: "",
    price: 0,
    quantity: 1,
    image: "/placeholder.svg?height=50&width=50",
  })

  // Inicializar el formulario con los datos del pedido si estamos editando
  useEffect(() => {
    if (isEditing && order) {
      setFormData({
        customerId: order.customerId,
        customerName: order.customerName,
        date: order.date,
        total: order.total,
        status: order.status,
        items: [...order.items],
      })
      setDate(new Date(order.date))
    } else {
      // Resetear el formulario para un nuevo pedido
      setFormData({
        customerId: "",
        customerName: "",
        date: new Date().toISOString().split("T")[0],
        total: 0,
        status: "pending",
        items: [],
      })
      setDate(new Date())
    }
  }, [isEditing, order, isOpen])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setFormData((prev) => ({
        ...prev,
        date: format(newDate, "yyyy-MM-dd"),
      }))
    }
  }

  const handleNewItemChange = (field: string, value: string | number) => {
    setNewItem((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.quantity) {
      const itemToAdd = {
        id: newItem.id || `ITEM-${Date.now()}`,
        name: newItem.name,
        price: Number(newItem.price),
        quantity: Number(newItem.quantity),
        image: newItem.image || "/placeholder.svg?height=50&width=50",
      }

      const updatedItems = [...(formData.items || []), itemToAdd]

      // Recalcular el total
      const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      setFormData((prev) => ({
        ...prev,
        items: updatedItems,
        total: newTotal,
      }))

      // Resetear el formulario de nuevo item
      setNewItem({
        id: "",
        name: "",
        price: 0,
        quantity: 1,
        image: "/placeholder.svg?height=50&width=50",
      })
    }
  }

  const removeItem = (itemId: string) => {
    const updatedItems = formData.items?.filter((item) => item.id !== itemId) || []

    // Recalcular el total
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total: newTotal,
    }))
  }

  // Modificar la función handleSubmit para mostrar un Toast y disparar un evento
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave(formData)

    // Mostrar Toast según la acción (crear o editar)
    if (isEditing) {
      toast({
        title: "Pedido actualizado",
        description: `El pedido ha sido actualizado correctamente.`,
        type: "success",
      })
    } else {
      toast({
        title: "Nuevo pedido registrado",
        description: `Se ha registrado un nuevo pedido para ${formData.customerName}.`,
        type: "success",
      })
    }

    // Disparar evento si el pedido es pendiente para actualizar el contador en el navbar
    if (formData.status === "pending") {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("orderCreated"))
      }
    }

    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Pedido" : "Crear Nuevo Pedido"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nombre del Cliente</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  placeholder="Nombre del cliente"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerId">ID del Cliente</Label>
                <Input
                  id="customerId"
                  value={formData.customerId}
                  onChange={(e) => handleInputChange("customerId", e.target.value)}
                  placeholder="ID del cliente"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha del Pedido</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">En Proceso</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Productos</Label>

              {/* Lista de productos actuales */}
              {formData.items && formData.items.length > 0 ? (
                <div className="border rounded-md p-2 mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Producto</th>
                        <th className="text-right py-2 px-2">Precio</th>
                        <th className="text-right py-2 px-2">Cantidad</th>
                        <th className="text-right py-2 px-2">Subtotal</th>
                        <th className="text-center py-2 px-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-2 px-2">{item.name}</td>
                          <td className="py-2 px-2 text-right">${item.price.toFixed(2)}</td>
                          <td className="py-2 px-2 text-right">{item.quantity}</td>
                          <td className="py-2 px-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="py-2 px-2 text-center">
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold">
                        <td className="py-2 px-2" colSpan={3}>
                          Total
                        </td>
                        <td className="py-2 px-2 text-right">${formData.total?.toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No hay productos en este pedido</div>
              )}

              {/* Formulario para añadir nuevo producto */}
              <div className="border rounded-md p-4 bg-slate-50">
                <h4 className="font-medium mb-2">Añadir Producto</h4>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2">
                    <Label htmlFor="productName" className="text-xs">
                      Nombre
                    </Label>
                    <Input
                      id="productName"
                      value={newItem.name}
                      onChange={(e) => handleNewItemChange("name", e.target.value)}
                      placeholder="Nombre del producto"
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productPrice" className="text-xs">
                      Precio
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      value={newItem.price === 0 ? "" : newItem.price}
                      onChange={(e) => handleNewItemChange("price", Number.parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productQuantity" className="text-xs">
                      Cantidad
                    </Label>
                    <Input
                      id="productQuantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => handleNewItemChange("quantity", Number.parseInt(e.target.value) || 1)}
                      min="1"
                      className="h-8"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={addItem}
                  disabled={!newItem.name || !newItem.price}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Añadir Producto
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

