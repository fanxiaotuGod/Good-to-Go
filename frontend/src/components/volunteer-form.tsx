"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const VolunteerSchema = z.object({
  vehicleSize: z.enum(["small", "medium", "large"]),
  radius: z.number().min(1, "Radius must be at least 1 km"),
})

export function VolunteerForm({
                                onSubmitVolunteer,
                              }: {
  onSubmitVolunteer: (loc: google.maps.LatLngLiteral, radius: number) => void
}) {
  const form = useForm<z.infer<typeof VolunteerSchema>>({
    resolver: zodResolver(VolunteerSchema),
    defaultValues: {
      vehicleSize: "medium",
      radius: 1,
    },
  })

  const [open, setOpen] = useState(false)

  async function onSubmit(data: z.infer<typeof VolunteerSchema>) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          onSubmitVolunteer(userLoc, data.radius)
          setOpen(false)
          form.reset()
        },
        (error) => {
          console.error("Geolocation error:", error)
          alert("Unable to access your location. Please allow location access.")
        }
    )
  }

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Rescue Food Now!</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Find Nearby Food</DialogTitle>
            <DialogDescription>
              Submit your vehicle size and delivery radius.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                  control={form.control}
                  name="vehicleSize"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="radius"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Radius: {field.value} km</FormLabel>
                        <FormControl>
                          <Slider
                              defaultValue={[field.value]}
                              min={1}
                              max={50}
                              step={1}
                              onValueChange={(val) => field.onChange(val[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}
