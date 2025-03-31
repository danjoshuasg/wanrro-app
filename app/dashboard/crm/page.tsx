import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCRMData } from "@/lib/data"
import LeadsTable from "@/components/crm/leads-table"
import OpportunitiesPipeline from "@/components/crm/opportunities-pipeline"
import ClientsTable from "@/components/crm/clients-table"
import AddLeadButton from "@/components/crm/add-lead-button"

export default async function CRMPage() {
  const crmData = await getCRMData()

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">CRM</h1>
        <AddLeadButton />
      </div>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <OpportunitiesPipeline opportunities={crmData.opportunities} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leads Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadsTable leads={crmData.leads} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientsTable clients={crmData.clients} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

