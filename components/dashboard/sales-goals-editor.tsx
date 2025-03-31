"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Save, X } from "lucide-react"

interface SalesGoal {
  quarter: string
  period: string
  target: number
  achieved: number
  percentage: number
  color: string
}

const initialGoals: Record<string, SalesGoal[]> = {
  "2023": [
    {
      quarter: "Q1 2023",
      period: "Enero - Marzo",
      target: 10000,
      achieved: 7500,
      percentage: 75,
      color: "bg-green-500",
    },
    {
      quarter: "Q2 2023",
      period: "Abril - Junio",
      target: 12000,
      achieved: 7200,
      percentage: 60,
      color: "bg-blue-500",
    },
    {
      quarter: "Q3 2023",
      period: "Julio - Septiembre",
      target: 15000,
      achieved: 6750,
      percentage: 45,
      color: "bg-amber-500",
    },
    {
      quarter: "Q4 2023",
      period: "Octubre - Diciembre",
      target: 18000,
      achieved: 1800,
      percentage: 10,
      color: "bg-purple-500",
    },
  ],
  "2022": [
    {
      quarter: "Q1 2022",
      period: "Enero - Marzo",
      target: 8000,
      achieved: 7600,
      percentage: 95,
      color: "bg-green-500",
    },
    { quarter: "Q2 2022", period: "Abril - Junio", target: 9000, achieved: 8100, percentage: 90, color: "bg-blue-500" },
    {
      quarter: "Q3 2022",
      period: "Julio - Septiembre",
      target: 10000,
      achieved: 9500,
      percentage: 95,
      color: "bg-amber-500",
    },
    {
      quarter: "Q4 2022",
      period: "Octubre - Diciembre",
      target: 12000,
      achieved: 11400,
      percentage: 95,
      color: "bg-purple-500",
    },
  ],
  "2024": [
    { quarter: "Q1 2024", period: "Enero - Marzo", target: 15000, achieved: 0, percentage: 0, color: "bg-green-500" },
    { quarter: "Q2 2024", period: "Abril - Junio", target: 18000, achieved: 0, percentage: 0, color: "bg-blue-500" },
    {
      quarter: "Q3 2024",
      period: "Julio - Septiembre",
      target: 20000,
      achieved: 0,
      percentage: 0,
      color: "bg-amber-500",
    },
    {
      quarter: "Q4 2024",
      period: "Octubre - Diciembre",
      target: 25000,
      achieved: 0,
      percentage: 0,
      color: "bg-purple-500",
    },
  ],
}

export default function SalesGoalsEditor() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [goals, setGoals] = useState<Record<string, SalesGoal[]>>(initialGoals)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<{ target: number; achieved: number }>({ target: 0, achieved: 0 })

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    setEditingIndex(null)
  }

  const startEditing = (index: number) => {
    const goal = goals[selectedYear][index]
    setEditValues({ target: goal.target, achieved: goal.achieved })
    setEditingIndex(index)
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  const saveChanges = (index: number) => {
    const updatedGoals = { ...goals }
    const goal = updatedGoals[selectedYear][index]

    goal.target = editValues.target
    goal.achieved = editValues.achieved
    goal.percentage = Math.round((editValues.achieved / editValues.target) * 100)

    setGoals(updatedGoals)
    setEditingIndex(null)
  }

  const handleInputChange = (field: "target" | "achieved", value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setEditValues({ ...editValues, [field]: numValue })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Metas de Ventas</CardTitle>
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Año" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals[selectedYear].map((goal, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{goal.quarter}</p>
                  <p className="text-xs text-muted-foreground">{goal.period}</p>
                </div>
                {editingIndex === index ? (
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" onClick={cancelEditing}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => saveChanges(index)}>
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{goal.percentage}% completado</p>
                    <Button size="sm" variant="ghost" onClick={() => startEditing(index)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {editingIndex === index ? (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-xs">Meta ($)</label>
                    <Input
                      type="number"
                      value={editValues.target}
                      onChange={(e) => handleInputChange("target", e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Logrado ($)</label>
                    <Input
                      type="number"
                      value={editValues.achieved}
                      onChange={(e) => handleInputChange("achieved", e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-muted-foreground">
                  <div>Meta: ${goal.target.toLocaleString()}</div>
                  <div>Logrado: ${goal.achieved.toLocaleString()}</div>
                </div>
              )}

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`${goal.color} h-full rounded-full`} style={{ width: `${goal.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

