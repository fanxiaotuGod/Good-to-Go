"use client"

import { Button } from "@/components/ui/button"

interface DeliveryCardProps {
  onCancel: () => void
  onComplete: () => void
}

export default function DeliveryCard({ onCancel, onComplete }: DeliveryCardProps) {
  return (
    <div className="fixed bottom-4 right-10 p-4 bg-white rounded-lg shadow-lg z-50 w-72">
      <p className="font-semibold text-lg mb-2">Delivery in Progress</p>
      <p className="text-sm text-muted-foreground mb-4">
        You're delivering food to the selected donor.
      </p>
      <div className="flex justify-between gap-1">
        <Button onClick={onComplete}>
          Complete Delivery
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
