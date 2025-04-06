<<<<<<< HEAD
"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
=======
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
>>>>>>> 1531568 (api-addition)

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
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const VolunteerSchema = z.object({
  vehicleSize: z.enum(["small", "medium", "large"]),
  radius: z.number().min(1, "Radius must be at least 1 km"),
})

export function VolunteerForm() {
  const form = useForm<z.infer<typeof VolunteerSchema>>({
    resolver: zodResolver(VolunteerSchema),
    defaultValues: {
      vehicleSize: "medium",
      radius: 1,
    },
  })

  const [open, setOpen] = useState(false)

  async function onSubmit(data: z.infer<typeof VolunteerSchema>) {
    try {
      const res = await fetch("http://localhost:5000/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (!res.ok || result.success === false) {
        alert(result.message || "Failed to submit volunteer info")
      } else {
        alert("Thanks for signing up!")
        setOpen(false)
        form.reset()
      }
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong. Try again later.")
    }
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
