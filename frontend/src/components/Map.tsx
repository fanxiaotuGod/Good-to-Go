"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, MarkerProps } from "@react-google-maps/api";
import { Donor } from "@/app/home/page"; // Adjust as needed

interface MapProps {
  donors: Donor[];
  highlightedDonorId: number | null;
  onMarkerClick: (donorId: number | null) => void;
  onMarkerHover: (donorId: number | null) => void;
}

// An inline SVG for a blue circle marker
const BLUE_CIRCLE_SVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <circle cx="12" cy="12" r="8" fill="blue" />
  </svg>
`);

const defaultCenter = { lat: 49.2827, lng: -123.1207 };

const Map: React.FC<MapProps> = ({ donors, highlightedDonorId, onMarkerClick, onMarkerHover }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA",
  });

  const [volunteerPosition, setVolunteerPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Watch for volunteer's position
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setVolunteerPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  const mapCenter = volunteerPosition || defaultCenter;

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={mapCenter}
        zoom={12}
      >
        {/* Volunteer’s Location as a Blue Circle Marker */}
        {volunteerPosition && (
          <Marker
            position={volunteerPosition}
            title="Your Location"
            // Custom SVG icon for a small blue circle
            icon={{
              url: `data:image/svg+xml,${BLUE_CIRCLE_SVG}`,
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12), // center the icon
            }}
          />
        )}

        {/* Donor Markers */}
        {donors.map((donor) => (
          <Marker
            key={donor.id}
            position={{ lat: donor.latitude, lng: donor.longitude }}
            title={donor.name}
            onClick={() => onMarkerClick(donor.id)}
            onMouseOver={() => onMarkerHover(donor.id)}
            onMouseOut={() => onMarkerHover(null)}
            icon={
              highlightedDonorId === donor.id
                ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : undefined
            }
          >
            {highlightedDonorId === donor.id && (
              <InfoWindow onCloseClick={() => onMarkerHover(null)}>
                <div>{donor.name}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
