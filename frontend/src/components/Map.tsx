"use client";

import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Donor } from "@/app/home/page"; // or wherever your Donor interface is

interface MapProps {
  donors: Donor[];
  highlightedDonorId: number | null;
  onMarkerClick: (donorId: number | null) => void;
  onMarkerHover: (donorId: number | null) => void; // <-- new prop
}

const center = {
  lat: 49.2827,
  lng: -123.1207,
};

const Map: React.FC<MapProps> = ({ donors, highlightedDonorId, onMarkerClick, onMarkerHover }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA",
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full h-full">
      <GoogleMap mapContainerClassName="w-full h-full" center={center} zoom={12}>
        {donors.map((donor) => (
          <Marker
            key={donor.id}
            position={{ lat: donor.latitude, lng: donor.longitude }}
            title={donor.name}
            onClick={() => onMarkerClick(donor.id)}
            // Add mouseover/mouseout to highlight
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
