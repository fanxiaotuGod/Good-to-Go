"use client";

import { useEffect, useState } from "react";
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
  const [vehicleSize, setVehicleSize] = useState<"small" | "medium" | "large">("medium");
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [acceptedDonor, setAcceptedDonor] = useState<Donor | null>(null);
  const [donors, setDonors] = useState<Donor[]>([]);

  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/donor");
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error("Failed to fetch donors", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleVolunteerSubmit = (
      loc: google.maps.LatLngLiteral,
      rad: number,
      size: "small" | "medium" | "large"
  ) => {
    setVolunteerLocation(loc);
    setRadius(rad);
    setVehicleSize(size);
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

  const handleCompleteDelivery = async () => {
    if (!acceptedDonor) return;

    try {
      const res = await fetch(`http://localhost:5001/api/donor/${acceptedDonor.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Failed to delete donor: " + data.message);
        return;
      }

      alert("Delivery completed and donor deleted!");
      fetchDonors();
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert("Failed to delete donor.");
    }

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
                donors={donors}
                onSelectDonor={setSelectedDonor}
                onAcceptPickup={handleAcceptPickup}
                volunteerLocation={volunteerLocation}
                radius={radius}
            />
            <main className="flex-1 overflow-hidden">
              <Map
                  donors={donors}
                  volunteerLocation={volunteerLocation}
                  radius={radius}
                  vehicleSize={vehicleSize}
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