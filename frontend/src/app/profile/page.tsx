import { NavigationMenuDemo } from "@/components/navbar";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function ProfilePage() {
    return (
      <div className="flex flex-col max-h-screen relative">
          {/* Navbar at top */}
          <header className="sticky top-0 z-50 bg-white shadow">
            <NavigationMenuDemo />
          </header>

          <div className="flex flex-col items-center justify-center pt-30 max-h-screen text-center">
            {/* Main content */}
            <img src="/profile.png" alt="Profile Photo" className="w-32 h-32 mb-4"></img>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-muted-foreground text-xl">
              Here are your account details.
            </p>
      
            <div className="mt-4">
              <h2 className="text-2xl font-semibold m-4">Statistics</h2>
              <blockquote className="p-4 m-4 bg-gray-100 rounded-lg text-center text-xl text-gray-700">
                Total Deliveries: 5
              </blockquote>
              <blockquote className="p-4 m-4 bg-gray-100 rounded-lg text-center text-xl text-gray-700">
                Total Distance Travelled (km): 5
              </blockquote>
            </div>

            <div className="mt-4">
              <Button asChild size = "lg">
                <Link href="/">Logout</Link>
              </Button>
            </div>
          </div>
      </div>
    )
}