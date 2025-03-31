import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesDashboardData } from "@/types"

interface SalesOverviewProps {
  data: SalesDashboardData
}

export default function SalesOverview({ data }: SalesOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Ventas por Mes</CardTitle>
          <CardDescription>Comparación de ventas mensuales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.monthlySales.map((item) => (
              <div key={item.month} className="flex items-center">
                <div className="w-1/3 font-medium">{item.month}</div>
                <div className="w-2/3">
                  <div className="relative h-2 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-slate-100" />
                    <div
                      className="absolute inset-y-0 left-0 bg-primary"
                      style={{
                        width: `${(item.sales / Math.max(...data.monthlySales.map((s) => s.sales))) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-24 text-right font-medium">${item.sales}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Productos Populares</CardTitle>
          <CardDescription>Los productos más vendidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="rounded-full w-8 h-8 bg-slate-100 flex items-center justify-center font-medium">
                  {product.id.substring(product.id.length - 2)}
                </div>
                <div className="flex-1">
                  <div className="font-medium truncate" title={product.name}>
                    {product.name}
                  </div>
                  <div className="text-sm text-slate-500">{product.sales} unidades</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Crecimiento de Ventas</CardTitle>
          <CardDescription>Comparación con el período anterior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">
              {data.salesIncrease > 0 ? "+" : ""}
              {data.salesIncrease}%
            </div>
            <div className="text-sm text-slate-500">Respecto al mes anterior</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

