"use client"

import { NavigationMenuDemo } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow">
        <NavigationMenuDemo />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Good to Go</h1>

        <p className="text-lg text-gray-700 mb-6">
          Good to Go is a community-powered platform designed to connect
          volunteers with local organizations and people in need. Whether it's
          for disaster relief, community service, or everyday support, we help
          make volunteering easy and impactful.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              To empower communities through streamlined volunteer engagement,
              using technology to bring people together for good.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p>
              Born from a passion to help during times of crisis, Good-to-Go
              started as a hackathon project and grew into a full-fledged
              initiative supported by people who care.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Meet the Team</h2>
            <p>
              We're a group of developers, designers, and community leaders who
              believe in the power of volunteering.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
