// AppSidebar.tsx
"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar";
import DonorPopover from "@/components/donor-popover";

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
    address?: string;
}

function isWithinRadius(
    origin: google.maps.LatLngLiteral,
    target: google.maps.LatLngLiteral,
    radiusKm: number
): boolean {
    const originLatLng = new google.maps.LatLng(origin.lat, origin.lng);
    const targetLatLng = new google.maps.LatLng(target.lat, target.lng);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
        originLatLng,
        targetLatLng
    );
    return distance <= radiusKm * 1000;
}

export function AppSidebar({
                               donors,
                               onAcceptPickup,
                               onSelectDonor,
                               volunteerLocation,
                               radius,
                           }: {
    donors: Donor[];
    onAcceptPickup: (donor: Donor) => void;
    onSelectDonor: (donor: Donor) => void;
    volunteerLocation: google.maps.LatLngLiteral | null;
    radius: number | null;
}) {
    const filteredDonors = donors.filter((donor) =>
        volunteerLocation && radius
            ? isWithinRadius(
                volunteerLocation,
                { lat: donor.latitude, lng: donor.longitude },
                radius
            )
            : true
    );

    return (
        <Sidebar>
            <SidebarHeader>Donors Near You</SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {filteredDonors.length > 0 ? "Available Donors" : "No Available Donors"}
                    </SidebarGroupLabel>
                    <ul className="space-y-3">
                        {filteredDonors.map((donor) => (
                            <DonorPopover key={donor.id} onAccept={() => onAcceptPickup(donor)}>
                                <li
                                    className="p-2 rounded-md bg-muted hover:bg-muted/80 cursor-pointer transition"
                                    onClick={() => onSelectDonor(donor)}
                                >
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
    );
}

