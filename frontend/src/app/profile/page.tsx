export default function ProfilePage() {
    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your account information and preferences.
        </p>
  
        {/* Add more profile-related sections here */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Volunteer Preferences</h2>
          <ul className="list-disc list-inside mt-2">
            <li>Vehicle size: Medium</li>
            <li>Delivery radius: 15 km</li>
            <li>Preferred hours: 10AM - 4PM</li>
          </ul>
        </div>
      </div>
    )
}