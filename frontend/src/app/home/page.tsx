"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VolunteerForm } from "@/components/volunteer-form";
import { NavigationMenuDemo } from "@/components/navbar";
import Map from "@/components/Map";
import DeliveryCard from "@/components/delivery-card";

interface FoodItem {
  product_name: string;
  product_amount: number;
  days_before_expiration: number;
}

interface Donor {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  items: FoodItem[];
}

export default function Home() {
  const [deliveryInProgress, setDeliveryInProgress] = useState(false);
  const [volunteerLocation, setVolunteerLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [radius, setRadius] = useState<number | null>(null);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [acceptedDonor, setAcceptedDonor] = useState<Donor | null>(null);

  const handleVolunteerSubmit = (loc: google.maps.LatLngLiteral, rad: number) => {
    setVolunteerLocation(loc);
    setRadius(rad);
  };

  const handleAcceptPickup = (donor: Donor) => {
    setAcceptedDonor(donor);
    setSelectedDonor(null);
    setDeliveryInProgress(true);
  };

  const handleCancelDelivery = () => {
    setAcceptedDonor(null);
    setSelectedDonor(null);
    setDeliveryInProgress(false);
  };

  const handleCompleteDelivery = () => {
    alert("Delivery completed!");
    setAcceptedDonor(null);
    setDeliveryInProgress(false);
  };

  return (
      <div className="flex flex-col max-h-screen relative">
        <header className="sticky top-0 z-50 bg-white shadow">
          <NavigationMenuDemo />
        </header>

        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider>
            <AppSidebar
                onSelectDonor={setSelectedDonor}
                onAcceptPickup={handleAcceptPickup}
                volunteerLocation={volunteerLocation}
                radius={radius}
            />
            <main className="flex-1 overflow-hidden">
              <Map
                  volunteerLocation={volunteerLocation}
                  radius={radius}
                  selectedDonor={selectedDonor}
                  acceptedDonor={acceptedDonor}
                  onSelectDonor={setSelectedDonor}
              />
            </main>
          </SidebarProvider>
        </div>

        <div className="fixed bottom-4 left-70 shadow-lg z-40">
          <VolunteerForm onSubmitVolunteer={handleVolunteerSubmit} />
        </div>

        {deliveryInProgress && (
            <DeliveryCard
                onCancel={handleCancelDelivery}
                onComplete={handleCompleteDelivery}
            />
        )}
      </div>
  );
}