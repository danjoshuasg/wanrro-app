"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Card, CardContent } from "@/components/ui/card"
import type { Opportunity } from "@/types"

interface OpportunitiesPipelineProps {
  opportunities: Opportunity[]
}

export default function OpportunitiesPipeline({ opportunities: initialOpportunities }: OpportunitiesPipelineProps) {
  const [opportunities, setOpportunities] = useState(initialOpportunities)

  const stages = [
    {
      id: "initial-contact",
      title: "Contacto Inicial",
    },
    {
      id: "proposal",
      title: "Propuesta",
    },
    {
      id: "negotiation",
      title: "Negociación",
    },
    {
      id: "won",
      title: "Ganado",
    },
    {
      id: "lost",
      title: "Perdido",
    },
  ]

  const getOpportunitiesByStage = (stageId: string) => {
    return opportunities.filter((opp) => opp.stage === stageId)
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Update opportunity stage
    const updatedOpportunities = opportunities.map((opp) => {
      if (opp.id === draggableId) {
        return {
          ...opp,
          stage: destination.droppableId,
        }
      }
      return opp
    })

    setOpportunities(updatedOpportunities)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div key={stage.id} className="min-w-[280px]">
            <h3 className="font-medium mb-2">{stage.title}</h3>
            <Droppable droppableId={stage.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-slate-50 rounded-lg p-3 min-h-[70vh]"
                >
                  {getOpportunitiesByStage(stage.id).map((opportunity, index) => (
                    <Draggable key={opportunity.id} draggableId={opportunity.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-3"
                        >
                          <CardContent className="p-3 space-y-2">
                            <h4 className="font-medium text-sm">{opportunity.title}</h4>
                            <div className="text-xs text-slate-500">{opportunity.clientName}</div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="font-bold">${opportunity.value}</div>
                              <div className="bg-slate-200 px-2 py-0.5 rounded-full">{opportunity.probability}%</div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}

