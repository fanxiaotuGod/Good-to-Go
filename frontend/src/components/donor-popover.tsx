"use client"

import { useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface DonorPopoverProps {
  children: React.ReactNode
  onAccept?: () => void
}

export default function DonorPopover({ children, onAccept }: DonorPopoverProps) {
  const [open, setOpen] = useState(false)

  const handleAccept = () => {
    if (onAccept) onAccept()
    setOpen(false) // Close the popover
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="right" className="w-64">
        <p className="font-medium mb-2">Interested in this donation?</p>
        <p className="text-sm text-muted-foreground mb-3">
          You can proceed to coordinate a pickup or get directions from your location.
        </p>
        <Button size="sm" variant="default" className="w-full" onClick={handleAccept}>
          Accept Pickup
        </Button>
      </PopoverContent>
    </Popover>
  )
}
