"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Client } from "@/types"

interface CreateOpportunityModalProps {
  client: Client | null
  isOpen: boolean
  onClose: () => void
}

export default function CreateOpportunityModal({ client, isOpen, onClose }: CreateOpportunityModalProps) {
  const [opportunityName, setOpportunityName] = useState("")
  const [estimatedValue, setEstimatedValue] = useState("")
  const [stage, setStage] = useState("prospection")
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!client) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Aquí iría la lógica para guardar la oportunidad
    console.log({
      clientId: client.id,
      clientName: client.name,
      title: opportunityName,
      value: Number.parseFloat(estimatedValue),
      stage,
      expectedCloseDate: date ? format(date, "yyyy-MM-dd") : "",
      notes,
    })

    setIsSubmitting(false)
    onClose()

    // Resetear formulario
    setOpportunityName("")
    setEstimatedValue("")
    setStage("prospection")
    setNotes("")
    setDate(new Date())
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Oportunidad</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input id="client" value={`${client.name} (${client.company})`} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opportunityName">Nombre de la Oportunidad</Label>
              <Input
                id="opportunityName"
                value={opportunityName}
                onChange={(e) => setOpportunityName(e.target.value)}
                placeholder="Ej: Venta de PLC Siemens"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Valor Estimado (USD)</Label>
              <Input
                id="estimatedValue"
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                placeholder="Ej: 20000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha de Cierre Estimada</Label>
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
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Etapa</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prospection">Prospección</SelectItem>
                  <SelectItem value="negotiation">Negociación</SelectItem>
                  <SelectItem value="closed">Cerrada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Detalles adicionales sobre la oportunidad..."
                rows={3}
              />
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

