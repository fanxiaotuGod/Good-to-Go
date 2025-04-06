"use client"

import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

type Donor = {
  id: number
  name: string
  food_kg: number
  perishable: boolean
  location: string
}

export function AppSidebar() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch("http://localhost:5000/api/donors")
        const data = await res.json()
        setDonors(data)
      } catch (error) {
        console.error("Failed to fetch donors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonors()
  }, [])

  const sampleDonor = {
    id: 1,
    name: "Green Earth Grocers",
    food_kg: 25,
    perishable: true,
    location: "123 Elm Street, Vancouver, BC"
  }

  return (
    <Sidebar>
      <SidebarHeader>Donors Near You</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <ul className="space-y-2">
                <li key={sampleDonor.id} className="p-2 rounded-md bg-muted">
                <p className="font-semibold">{sampleDonor.name}</p>
                <p>{sampleDonor.food_kg} kg • {sampleDonor.perishable ? "Perishable" : "Non-perishable"}</p>
                <p className="text-xs text-muted-foreground">{sampleDonor.location}</p>
                </li>
            </ul>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            {loading ? "Loading..." : donors.length > 0 ? "Available Donors" : "No Available Donors"}
          </SidebarGroupLabel>
          <ul className="space-y-2">
            {donors.map((donor) => (
              <li key={donor.id} className="p-2 rounded-md bg-muted">
                <p className="font-semibold">{donor.name}</p>
                <p>
                  {donor.food_kg} kg • {donor.perishable ? "Perishable" : "Non-perishable"}
                </p>
                <p className="text-xs text-muted-foreground">{donor.location}</p>
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
