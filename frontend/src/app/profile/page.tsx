import { NavigationMenuDemo } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress"


export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <NavigationMenuDemo />
      </header>

      {/* Main content layout: sidebar + main */}
      <div className="flex flex-1">
        {/* Sidebar Profile */}
        <aside className="w-80 p-6 bg-gray-50 border-r">
          <div className="flex flex-col items-center text-center">
            <img src="/profile.png" alt="Profile Photo" className="w-32 h-32 mb-4 rounded-full" />
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground mb-4">Here are your account details.</p>

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-2">Statistics</h2>
              <blockquote className="p-3 bg-white rounded-lg shadow-sm mb-2 text-gray-700">
                Total Deliveries: 8
              </blockquote>
              <blockquote className="p-3 bg-white rounded-lg shadow-sm text-gray-700">
                Total Distance Travelled (km): 52
              </blockquote>
            </div>

            <Button asChild className="mt-6 w-full" size="lg">
              <Link href="/">Logout</Link>
            </Button>
          </div>
        </aside>

        {/* Main area placeholder */}
        <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg border-1 p-6">
            {/* Level Progress Section */}
            {(() => {
            const deliveriesPerLevel = 5
            const totalDeliveries = 8 // Replace with real data if needed

            const currentLevel = Math.floor(totalDeliveries / deliveriesPerLevel) + 1
            const deliveriesThisLevel = totalDeliveries % deliveriesPerLevel
            const deliveriesToNextLevel = deliveriesPerLevel
            const progressPercent = (deliveriesThisLevel / deliveriesToNextLevel) * 100

            const rewards = [
                {
                levelRequired: 1,
                name: "$5 Gift Card of Choice",
                image: "/amazon.jpg",
                description: "Awarded for completing 5 deliveries.",
                },
                {
                levelRequired: 2,
                name: "$10 Gift Card of Choice",
                image: "    /apple.png",
                description: "Awarded for completing 10 deliveries.",
                },
                {
                levelRequired: 3,
                name: "$15 Gift Card of Choice",
                image: "/bestbuy.jpg",
                description: "Awarded for completing 15 deliveries.",
                },
                {
                levelRequired: 4,
                name: "$25 Gift Card of Choice",
                image: "/starbucks.jpg",
                description: "Awarded for completing 25 deliveries",
                },
            ]

            return (
                <>
                <h2 className="text-xl font-bold mb-2">Level {currentLevel}</h2>
                <Progress value={progressPercent} />
                <p className="text-sm text-muted-foreground mt-2">
                    {deliveriesThisLevel}/{deliveriesToNextLevel} deliveries to next level
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-2">Rewards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((reward, index) => {
                    const unlocked = currentLevel >= reward.levelRequired
                    return (
                        <div
                        key={index}
                        className={`p-4 rounded-lg border shadow-sm transition ${
                            unlocked ? "bg-white" : "bg-gray-100 opacity-50 pointer-events-none"
                        }`}
                        >
                        <img
                            src={reward.image}
                            alt={reward.name}
                            className={`h-20 mx-auto mb-3 ${
                            unlocked ? "" : "grayscale"
                            }`}
                        />
                        <h4 className="text-md font-bold text-center">{reward.name}</h4>
                        <p className="text-sm text-center text-muted-foreground">{reward.description}</p>
                        {!unlocked && (
                            <p className="text-xs text-center text-gray-400 mt-2">
                            Unlocks at Level {reward.levelRequired}
                            </p>
                        )}
                        </div>
                    )
                    })}
                </div>
                </>
            )
            })()}
        </div>
        </main>
      </div>
    </div>
  );
}
