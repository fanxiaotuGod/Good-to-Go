"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Define TypeScript interfaces for your donor and food item data
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

// Center of the map 
const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA",
  });

  // State to store donors fetched from the API
  const [donors, setDonors] = useState<Donor[]>([]);

  // Fetch donors from your API when the component mounts
  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch("http://localhost:5001/api/donor");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Donor[] = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    }
    fetchDonors();
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full h-full">
      <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={12}>
        {donors.map((donor) => (
          <Marker
            key={donor.id}
            position={{ lat: donor.latitude, lng: donor.longitude }}
            title={donor.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
