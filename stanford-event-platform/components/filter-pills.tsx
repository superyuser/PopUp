"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FilterPillsProps {
  filters: string[]
  onChange?: (selected: string[]) => void
}

export function FilterPills({ filters, onChange }: FilterPillsProps) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    const newSelected = selected.includes(filter) ? selected.filter((f) => f !== filter) : [...selected, filter]

    setSelected(newSelected)
    onChange?.(newSelected)
  }

  return (
    <div className="flex flex-wrap gap-2 p-2">
      {filters.map((filter) => {
        const isSelected = selected.includes(filter)

        return (
          <Badge
            key={filter}
            variant={isSelected ? "default" : "outline"}
            className={cn("cursor-pointer transition-all", isSelected && "multitone-button text-primary-foreground")}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </Badge>
        )
      })}
    </div>
  )
}
