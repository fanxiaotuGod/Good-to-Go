"use client";

import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { VolunteerForm } from "@/components/volunteer-form";
import { NavigationMenuDemo } from "@/components/navbar";
import Map from "@/components/Map"; // import your map component

export default function Home() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col max-h-screen relative">
      {/* Navbar at top */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <NavigationMenuDemo />
      </header>

      {/* Sidebar + Map side-by-side */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-hidden">
            <Map />
          </main>
        </SidebarProvider>
      </div>

      {/* Volunteer Form at bottom left */}
      <div className="fixed bottom-4 left-70 shadow-lg z-40">
        <VolunteerForm />
      </div>
    </div>
=======
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <VolunteerForm /> 
      </main>
    </SidebarProvider>
>>>>>>> 1531568 (api-addition)
  );
}
