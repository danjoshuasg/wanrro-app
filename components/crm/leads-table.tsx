import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Lead } from "@/types"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LeadsTableProps {
  leads: Lead[]
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Nombre</th>
            <th className="text-left py-3 px-4">Empresa</th>
            <th className="text-left py-3 px-4">Email</th>
            <th className="text-left py-3 px-4">Teléfono</th>
            <th className="text-left py-3 px-4">Estado</th>
            <th className="text-left py-3 px-4">Fecha</th>
            <th className="text-left py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b">
              <td className="py-3 px-4 font-medium">{lead.name}</td>
              <td className="py-3 px-4">{lead.company}</td>
              <td className="py-3 px-4">{lead.email}</td>
              <td className="py-3 px-4">{lead.phone}</td>
              <td className="py-3 px-4">
                <Badge variant={getStatusVariant(lead.status)}>{getStatusLabel(lead.status)}</Badge>
              </td>
              <td className="py-3 px-4">{lead.date}</td>
              <td className="py-3 px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Convertir a Oportunidad</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case "new":
      return "default"
    case "contacted":
      return "secondary"
    case "qualified":
      return "success"
    case "unqualified":
      return "destructive"
    default:
      return "outline"
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "new":
      return "Nuevo"
    case "contacted":
      return "Contactado"
    case "qualified":
      return "Calificado"
    case "unqualified":
      return "No Calificado"
    default:
      return status
  }
}

