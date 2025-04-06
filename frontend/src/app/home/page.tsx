import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { VolunteerForm } from '@/components/volunteer-form';
import { NavigationMenuDemo } from '@/components/navbar';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-h-screen relative">
        {/* Navbar at top */}
        <header className="sticky top-0 z-50 bg-white shadow">
            <NavigationMenuDemo />
        </header>

        {/* Sidebar + Content side-by-side */}
        <div className="flex flex-1 overflow-hidden">
            <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4 overflow-auto">
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>

        {/* Volunteer Form at bottom left */}
        <div className="fixed bottom-4 left-70 z-40">
        <VolunteerForm />
        </div>
    </div>
  );
}
