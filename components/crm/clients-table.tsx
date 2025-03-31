"use client"

import { useState } from "react"
import type { Client } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Clock } from "lucide-react"
import ClientDetailsModal from "./client-details-modal"
import CreateOpportunityModal from "./create-opportunity-modal"
import PurchaseHistoryModal from "./purchase-history-modal"

interface ClientsTableProps {
  clients: Client[]
}

export default function ClientsTable({ clients }: ClientsTableProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [opportunityModalOpen, setOpportunityModalOpen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client)
    setDetailsModalOpen(true)
  }

  const handleCreateOpportunity = (client: Client) => {
    setSelectedClient(client)
    setOpportunityModalOpen(true)
  }

  const handleViewHistory = (client: Client) => {
    setSelectedClient(client)
    setHistoryModalOpen(true)
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Nombre</th>
              <th className="text-left py-3 px-4">Empresa</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Teléfono</th>
              <th className="text-left py-3 px-4">Última Compra</th>
              <th className="text-left py-3 px-4">Total Gastado</th>
              <th className="text-left py-3 px-4">Estado</th>
              <th className="text-left py-3 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-3 px-4 font-medium">{client.name}</td>
                <td className="py-3 px-4">{client.company}</td>
                <td className="py-3 px-4">{client.email}</td>
                <td className="py-3 px-4">{client.phone}</td>
                <td className="py-3 px-4">{client.lastPurchase}</td>
                <td className="py-3 px-4 font-bold">${client.totalSpent.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <Badge variant={client.status === "active" ? "success" : "secondary"}>
                    {client.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleViewDetails(client)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalles
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleCreateOpportunity(client)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Crear Oportunidad
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleViewHistory(client)}>
                      <Clock className="h-4 w-4 mr-1" />
                      Historial
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      <ClientDetailsModal
        client={selectedClient}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />

      <CreateOpportunityModal
        client={selectedClient}
        isOpen={opportunityModalOpen}
        onClose={() => setOpportunityModalOpen(false)}
      />

      <PurchaseHistoryModal
        client={selectedClient}
        isOpen={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
      />
    </>
  )
}

