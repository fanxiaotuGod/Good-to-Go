"use client";

import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = {
    lat: 49.2827,   // Vancouver latitude
    lng: -123.1207, // Vancouver longitude
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA",
    });

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        // Wrap in a div that takes full width and height
        <div className="w-full h-full">
            <GoogleMap
                mapContainerClassName="w-full h-full"
                center={center}
                zoom={12}
            >
                {/* Markers can be added here */}
            </GoogleMap>
        </div>
    );
};

export default Map;
