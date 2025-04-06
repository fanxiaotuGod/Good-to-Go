"use client"

import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"

interface FoodItem {
  product_name: string
  product_amount: number
  days_before_expiration: number
}

interface Donor {
  id: number
  name: string
  latitude: number
  longitude: number
  items: FoodItem[]
}

export function AppSidebar() {
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors") // Adjust if needed
        const data = await res.json()
        setDonors(data)
      } catch (err) {
        console.error("Error fetching donors:", err)
      }
    }

    fetchDonors()
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>Donors Near You</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {donors.length > 0 ? "Available Donors" : "No Available Donors"}
          </SidebarGroupLabel>
          <ul className="space-y-3">
            {donors.map((donor) => (
              <li key={donor.id} className="p-2 rounded-md bg-muted">
                <p className="font-semibold">{donor.name}</p>
                <p className="text-xs text-muted-foreground">
                  Lat: {donor.latitude}, Lng: {donor.longitude}
                </p>
                <ul className="mt-2 text-sm space-y-1">
                  {donor.items.length > 0 ? (
                    donor.items.map((item, index) => (
                      <li key={index}>
                        {item.product_name} – {item.product_amount} kg
                        {item.days_before_expiration != null && (
                          <span className="text-xs text-muted-foreground">
                            {" "}
                            ({item.days_before_expiration} days left)
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="italic text-muted-foreground text-xs">
                      No food items
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
