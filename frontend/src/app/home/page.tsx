"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Map from "@/components/Map";
import { NavigationMenuDemo } from "@/components/navbar";
import { VolunteerForm } from "@/components/volunteer-form";
import DeliveryCard from "@/components/delivery-card";

// Define your interfaces
export interface FoodItem {
  product_name: string;
  product_amount: number;
  days_before_expiration: number;
}

export interface Donor {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  items: FoodItem[];
  address?: string;
}

// Sample donors as fallback
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
];

// Function to fetch address from coordinates using Google Geocode API
async function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  const apiKey = "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA"; // Replace with your valid API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Log data for debugging
    console.log("Geocode API response:", data);
    return data.results?.[0]?.formatted_address || "Address not found";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Address fetch error";
  }
}

export default function Home() {
  const [deliveryInProgress, setDeliveryInProgress] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [highlightedDonorId, setHighlightedDonorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/donor");
        const rawDonors: Donor[] = await res.json();
        const source = rawDonors?.length > 0 ? rawDonors : sampleDonors;

        // Enrich donors with addresses
        const enriched = await Promise.all(
          source.map(async (donor) => {
            const address = await getAddressFromCoords(donor.latitude, donor.longitude);
            return { ...donor, address };
          })
        );

        // Sort donors by earliest expiry among their items
        const sorted = enriched.sort((a, b) => {
          const aMin = Math.min(...a.items.map(item => item.days_before_expiration ?? Infinity));
          const bMin = Math.min(...b.items.map(item => item.days_before_expiration ?? Infinity));
          return aMin - bMin;
        });

        setDonors(sorted);
      } catch (err) {
        console.error("Error fetching donors, using sample data:", err);

        // Enrich sample donors if the API fails
        const enrichedSample = await Promise.all(
          sampleDonors.map(async (donor) => {
            const address = await getAddressFromCoords(donor.latitude, donor.longitude);
            return { ...donor, address };
          })
        );

        const sortedSample = enrichedSample.sort((a, b) => {
          const aMin = Math.min(...a.items.map(item => item.days_before_expiration ?? Infinity));
          const bMin = Math.min(...b.items.map(item => item.days_before_expiration ?? Infinity));
          return aMin - bMin;
        });

        setDonors(sortedSample);
      }
    };

    fetchDonors();
  }, []);

  // Callback when a donor is hovered in the sidebar
  const handleSidebarHover = (donorId: number | null) => {
    setHighlightedDonorId(donorId);
  };

  // Callback when a marker is clicked on the map
  const handleMarkerClick = (donorId: number | null) => {
    setHighlightedDonorId(donorId);
  };

  // Callback when a marker is hovered on the map
  const handleMarkerHover = (donorId: number | null) => {
    setHighlightedDonorId(donorId);
  };

  const handleAcceptPickup = () => {
    setDeliveryInProgress(true);
  };

  const handleCancelDelivery = () => {
    setDeliveryInProgress(false);
  };

  const handleCompleteDelivery = () => {
    alert("Delivery completed!");
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
            highlightedDonorId={highlightedDonorId}
            onHoverDonor={handleSidebarHover}
            onAcceptPickup={handleAcceptPickup}
          />
          <main className="flex-1 overflow-hidden">
            <Map
              donors={donors}
              highlightedDonorId={highlightedDonorId}
              onMarkerClick={handleMarkerClick}
              onMarkerHover={handleMarkerHover}
            />
          </main>
        </SidebarProvider>
      </div>

      <div className="fixed bottom-4 left-70 shadow-lg z-40">
        <VolunteerForm />
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
