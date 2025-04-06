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
import DonorPopover from "@/components/donor-popover"

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
  address?: string
}

const sampleDonors: Donor[] = [
  {
    id: 0,
    name: "UBC Bookstore",
    latitude: 49.26525718092775,
    longitude: -123.25039483229551,
    items: [
      { product_name: "Bananas", product_amount: 10, days_before_expiration: 4 },
      { product_name: "Bread Loaves", product_amount: 5, days_before_expiration: 12 },
    ],
  },
  {
    id: 1,
    name: "L & G Bubble Tea",
    latitude: 49.232555466773775,
    longitude: -123.09363025093255,
    items: [
      { product_name: "Taro", product_amount: 12, days_before_expiration: 1 },
    ],
  },
]

export function AppSidebar({ onAcceptPickup }: { onAcceptPickup: () => void }) {
  const [donors, setDonors] = useState<Donor[]>([])

  async function getAddressFromCoords(lat: number, lng: number): Promise<string> {
    const apiKey = "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA"
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.results?.[0]?.formatted_address || "Address not found"
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      return "Address fetch error"
    }
  }

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donors")
        const rawDonors: Donor[] = await res.json()

        const source = rawDonors?.length > 0 ? rawDonors : sampleDonors

        const enriched = await Promise.all(
          source.map(async (donor) => {
            const address = await getAddressFromCoords(donor.latitude, donor.longitude)
            return { ...donor, address }
          })
        )

        setDonors(enriched)
      } catch (err) {
        console.error("Error fetching donors, using sample data:", err)

        const enrichedSample = await Promise.all(
          sampleDonors.map(async (donor) => {
            const address = await getAddressFromCoords(donor.latitude, donor.longitude)
            return { ...donor, address }
          })
        )

        setDonors(enrichedSample)
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
                <DonorPopover key={donor.id} onAccept={onAcceptPickup}>
                    <li className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer transition">
                        <p className="font-semibold">{donor.name}</p>
                        <p className="text-xs text-muted-foreground">
                        {donor.address || "Loading address..."}
                        </p>
                        <ul className="mt-2 text-sm space-y-1">
                        {donor.items.length > 0 ? (
                            donor.items.map((item, index) => (
                            <li key={index}>
                                {item.product_name}: {item.product_amount} kg{" "}
                                {item.days_before_expiration != null && (
                                <span className="text-xs text-muted-foreground">
                                    ({item.days_before_expiration} days left)
                                </span>
                                )}
                            </li>
                            ))
                        ) : (
                            <li className="italic text-muted-foreground text-xs">No food items</li>
                        )}
                        </ul>
                    </li>
                </DonorPopover>
            ))}
            </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}