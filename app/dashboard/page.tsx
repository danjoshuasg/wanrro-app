"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSalesDashboardData, getPendingOrders, getCRMData } from "@/lib/data"
import SalesOverview from "@/components/dashboard/sales-overview"
import TopProducts from "@/components/dashboard/top-products"
import SalesChart from "@/components/dashboard/sales-chart"
import ClientsTable from "@/components/crm/clients-table"
import SalesGoalsEditor from "@/components/dashboard/sales-goals-editor"
import EditableOrdersTable from "@/components/dashboard/editable-orders-table"

export default function DashboardPage() {
  // Todos los hooks primero, antes de cualquier lógica condicional
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [data, setData] = useState({
    dashboardData: null,
    pendingOrders: [],
    crmData: null,
  })
  const [isDataLoading, setIsDataLoading] = useState(true)

  // Efecto para redireccionar si no hay usuario autenticado
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  // Efecto para cargar los datos del dashboard
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          setIsDataLoading(true)
          const dashboardData = await getSalesDashboardData()
          const pendingOrders = await getPendingOrders()
          const crmData = await getCRMData()

          setData({
            dashboardData,
            pendingOrders,
            crmData,
          })
        } catch (error) {
          console.error("Error loading dashboard data:", error)
        } finally {
          setIsDataLoading(false)
        }
      }
    }

    loadData()
  }, [user])

  // Renderizado condicional después de todos los hooks
  if (isLoading) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Acceso restringido. Redirigiendo...</p>
        </div>
      </div>
    )
  }

  if (isDataLoading || !data.dashboardData) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Cargando datos del dashboard...</p>
        </div>
      </div>
    )
  }

  // Destructurar los datos una vez que sabemos que están disponibles
  const { dashboardData, pendingOrders, crmData } = data

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Control</h1>
          <p className="text-muted-foreground">Bienvenido, {user.name}</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/")}>
          Volver al Inicio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.salesIncrease > 0 ? "+" : ""}
              {dashboardData.salesIncrease}% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
            <div className="flex flex-col">
              <p className="text-xs text-muted-foreground">{dashboardData.newOrders} nuevos pedidos hoy</p>
              {pendingOrders.length > 0 && (
                <p className="text-xs font-medium text-red-600">
                  {pendingOrders.length} pendientes ($
                  {pendingOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} USD)
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.opportunities}</div>
            <p className="text-xs text-muted-foreground">
              ${dashboardData.opportunitiesValue.toFixed(2)} USD en valor potencial
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeClients}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.newClients} nuevos este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ventas Mensuales</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Ventas totales acumuladas: ${dashboardData.totalSales.toFixed(2)} USD
                </p>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart data={dashboardData.monthlySales} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <TopProducts products={dashboardData.topProducts} />
              </CardContent>
            </Card>
          </div>
          <div>
            <SalesGoalsEditor />
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <SalesOverview data={dashboardData} />
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <EditableOrdersTable orders={dashboardData.recentOrders} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
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

