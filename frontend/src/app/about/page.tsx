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
        <h1 className="text-4xl font-bold mb-6">About</h1>
        {/* Standout Quotes */}
        <div className="bg-gray-100 p-4 mb-4 rounded-lg">
          <blockquote className="text-center text-xl italic text-gray-700">
            "If food loss and waste were a country it would be <br/>
            the 3rd biggest source of greenhouse gas emissions."
            <br />
            <br />
            <a href="https://www.weforum.org/stories/2022/09/food-waste-climate-drought-farmers/">
              Source: World Economic Forum
            </a>
          </blockquote>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          good2go is a community-powered platform designed to connect volunteers with the <a href = "https://www.foodstash.ca/">Food Stash</a> charity and 
          people in need. Whether it's for disaster relief, community service, or everyday support, we help
          make volunteering easy and impactful.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              We empower communities through streamlined volunteer engagement, using technology to bring 
              people together for good.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p>
              Born from a passion to help during times of crisis, good2go stemmed from a simple desire to 
              support local communities before growing into a full-fledged initiative supported by people 
              who care.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
            <p className="mb-4">
              We're a group of developers and designers who believe in the power of volunteering.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/arevaura">
                <img src="/icon1.png" alt="Profile 1" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/jennyuxi">
                <img src="/icon2.png" alt="Profile 2" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/fanxiaotuGod">
                <img src="/icon1.png" alt="Profile 3" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/fanxiaotuGod">
                <img src="/icon2.png" alt="Profile 4" className="w-10 h-10 rounded-full" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
