"use client";

import { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import DonorPopover from "@/components/donor-popover";

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

interface AppSidebarProps {
  donors: Donor[];
  highlightedDonorId: number | null;
  onHoverDonor: (donorId: number | null) => void;
  onAcceptPickup: () => void;
}

export function AppSidebar({
  donors,
  highlightedDonorId,
  onHoverDonor,
  onAcceptPickup,
}: AppSidebarProps) {
  // Whenever the highlighted donor changes, scroll its element into view.
  useEffect(() => {
    if (highlightedDonorId !== null) {
      const element = document.getElementById(`donor-${highlightedDonorId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [highlightedDonorId]);

  return (
    <Sidebar>
      <SidebarHeader>Donors Near You</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {donors.length > 0 ? "Available Donors" : "No Available Donors"}
          </SidebarGroupLabel>
          <ul className="space-y-3">
            {donors.map((donor) => (
              <DonorPopover key={donor.id} onAccept={onAcceptPickup}>
                <li
                  // Assign a unique id to each donor list item
                  id={`donor-${donor.id}`}
                  className={`p-2 rounded-md cursor-pointer transition ${
                    highlightedDonorId === donor.id ? "bg-green-200" : "bg-muted"
                  }`}
                  onMouseEnter={() => onHoverDonor(donor.id)}
                  onMouseLeave={() => onHoverDonor(null)}
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
                      <li className="italic text-muted-foreground text-xs">
                        No food items
                      </li>
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
