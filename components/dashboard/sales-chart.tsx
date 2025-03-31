"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SalesChartProps {
  data: { month: string; sales: number }[]
}

export default function SalesChart({ data }: SalesChartProps) {
  // Formatear los datos para mostrar en miles (K) para mejor legibilidad
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value}`
  }

  // Formatear el tooltip para mostrar el valor completo
  const formatTooltip = (value: number) => {
    return [`$${value.toFixed(2)}`, "Ventas"]
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={formatYAxis} />
        <Tooltip formatter={formatTooltip} />
        <Legend />
        <Line
          name="Ventas mensuales (USD)"
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

