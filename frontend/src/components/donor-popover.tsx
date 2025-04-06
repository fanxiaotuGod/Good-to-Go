"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface DonorPopoverProps {
  children: React.ReactNode
}

export default function DonorPopover({ children }: DonorPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="font-medium mb-2">Interested in this donation?</p>
        <p className="text-sm text-muted-foreground mb-3">
          You can proceed to coordinate a pickup or get directions from your location.
        </p>
        <Button size="sm" variant="default" className="w-full">
          Accept Pickup
        </Button>
      </PopoverContent>
    </Popover>
  )
}
