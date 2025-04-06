"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api"

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

interface Props {
  donors: Donor[]
  volunteerLocation: google.maps.LatLngLiteral | null
  radius: number | null
  vehicleSize: "small" | "medium" | "large"
  selectedDonor: Donor | null
  acceptedDonor: Donor | null
  onSelectDonor: (donor: Donor) => void
}

function isWithinRadius(
    origin: google.maps.LatLngLiteral,
    target: google.maps.LatLngLiteral,
    radiusKm: number
): boolean {
  const originLatLng = new google.maps.LatLng(origin.lat, origin.lng)
  const targetLatLng = new google.maps.LatLng(target.lat, target.lng)
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
      originLatLng,
      targetLatLng
  )
  return distance <= radiusKm * 1000
}

const Map = ({
               donors,
               volunteerLocation,
               radius,
               vehicleSize,
               selectedDonor,
               acceptedDonor,
               onSelectDonor,
             }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDsK_Pqk2itHXUiHQ39qcFxpFzD-Cf7HeA",
    libraries: ["geometry"],
  })

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

  const mapRef = useRef<google.maps.Map | null>(null)
  const circleRef = useRef<google.maps.Circle | null>(null)

  const dropoffLocation = { lat: 49.2684, lng: -123.097955 }

  useEffect(() => {
    if (mapRef.current && volunteerLocation && radius) {
      if (circleRef.current) {
        circleRef.current.setMap(null)
      }
      const circle = new google.maps.Circle({
        center: volunteerLocation,
        radius: radius * 1000,
        fillColor: "#3b82f6",
        fillOpacity: 0.15,
        strokeColor: "#3b82f6",
        strokeWeight: 2,
        map: mapRef.current,
      })
      circleRef.current = circle
    }
  }, [volunteerLocation, radius])

  useEffect(() => {
    const donor = acceptedDonor || selectedDonor
    if (!donor || !volunteerLocation) return

    const directionsService = new google.maps.DirectionsService()
    directionsService.route(
        {
          origin: volunteerLocation,
          destination: dropoffLocation,
          waypoints: [
            {
              location: new google.maps.LatLng(donor.latitude, donor.longitude),
              stopover: true,
            },
          ],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result)
          } else {
            console.error("Multi-stop route failed:", status)
            setDirections(null)
          }
        }
    )
  }, [volunteerLocation, acceptedDonor, selectedDonor])

  useEffect(() => {
    if (!acceptedDonor && !selectedDonor) {
      setDirections(null)
    }
  }, [acceptedDonor, selectedDonor])

  if (!isLoaded) return <div>Loading map...</div>

  return (
      <GoogleMap
          mapContainerClassName="w-full h-full"
          center={volunteerLocation || { lat: 49.2827, lng: -123.1207 }}
          zoom={12}
          onLoad={(map) => {
            mapRef.current = map
          }}
      >
        {donors
            .filter((donor) =>
                volunteerLocation && radius
                    ? isWithinRadius(
                        volunteerLocation,
                        { lat: donor.latitude, lng: donor.longitude },
                        radius
                    )
                    : true
            )
            .map((donor) => (
                <Marker
                    key={donor.id}
                    position={{ lat: donor.latitude, lng: donor.longitude }}
                    title={donor.name}
                    onClick={() => onSelectDonor(donor)}
                />
            ))}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
  )
}

export default Map