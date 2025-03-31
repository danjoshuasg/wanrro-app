import { Progress } from "@/components/ui/progress"

interface TopProductsProps {
  products: { id: string; name: string; sales: number }[]
}

export default function TopProducts({ products }: TopProductsProps) {
  const maxSales = Math.max(...products.map((p) => p.sales))

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-slate-500">{product.sales} unidades</span>
          </div>
          <Progress value={(product.sales / maxSales) * 100} className="h-2" />
        </div>
      ))}
    </div>
  )
}

