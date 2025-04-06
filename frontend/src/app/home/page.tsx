"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { VolunteerForm } from "@/components/volunteer-form"
import { NavigationMenuDemo } from "@/components/navbar"
import Map from "@/components/Map"
import { Button } from "@/components/ui/button"
import DeliveryCard from "@/components/delivery-card"


export default function Home() {
  const [deliveryInProgress, setDeliveryInProgress] = useState(false)

  const handleAcceptPickup = () => {
    setDeliveryInProgress(true)
  }

  const handleCancelDelivery = () => {
    setDeliveryInProgress(false)
  }

  const handleCompleteDelivery = () => {
    alert("Delivery completed!");
    setDeliveryInProgress(false);
  }  

  return (
    <div className="flex flex-col max-h-screen relative">
      <header className="sticky top-0 z-50 bg-white shadow">
        <NavigationMenuDemo />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <AppSidebar onAcceptPickup={handleAcceptPickup} />
          <main className="flex-1 overflow-hidden">
            <Map />
          </main>
        </SidebarProvider>
      </div>

      <div className="fixed bottom-4 left-10 shadow-lg z-40">
        <VolunteerForm />
      </div>

      {deliveryInProgress && (
        <DeliveryCard
            onCancel={handleCancelDelivery}
            onComplete={handleCompleteDelivery}
        />
        )}


    </div>
  )
}
