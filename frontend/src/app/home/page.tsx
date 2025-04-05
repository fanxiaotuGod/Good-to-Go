import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { VolunteerForm } from '@/components/volunteer-form';
import { NavigationMenuDemo } from '@/components/navbar';

export default function Home({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col max-h-screen">
        {/* Navbar at top */}
        <header className="sticky top-0 z-50 bg-white shadow">
            <NavigationMenuDemo />
        </header>
  
        {/* Sidebar + Content side-by-side */}
        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4">
              <SidebarTrigger />
              {children}
              <VolunteerForm />
            </main>
          </SidebarProvider>
        </div>
      </div>
    )
}
  