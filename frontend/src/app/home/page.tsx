import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { VolunteerForm } from '@/components/volunteer-form';

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <VolunteerForm /> 
      </main>
    </SidebarProvider>
    
  );
}