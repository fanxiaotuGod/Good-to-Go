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
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        <section className="mb-6">
          <h1 className="text-4xl font-bold mb-2">About good2go!</h1>
          <div>
            <p className="text-lg text-gray-700 mb-6">
              good2go is a community-powered platform designed to connect volunteers with 
              the <a href="https://www.foodstash.ca/" target="_blank" rel="noopener noreferrer">Food Stash</a> charity 
              and people in need.
            </p>
          </div>
        </section>
        
        <section className="grid grid-cols-2 gap-8">
          <div>
            <blockquote className="px-6 py-4 mb-4 bg-gray-100 rounded-lg text-center text-xl italic text-gray-700">
              "If food loss and waste were a country it would be 
              the 3rd biggest source of greenhouse gas emissions."
              <br />
              <br />
              <a href="https://www.weforum.org/stories/2022/09/food-waste-climate-drought-farmers/" target="_blank" rel="noopener noreferrer">
                Source: World Economic Forum
              </a>
            </blockquote>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              We empower communities through streamlined volunteer engagement, using technology to bring 
              people together for good.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Born from a passion to help during times of crisis, good2go stemmed from a simple desire to 
              support local communities before growing into a full-fledged initiative supported by people 
              who care.
            </p>
            <h2 className="text-2xl font-semibold mb-2">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We're a group of developers and designers who believe in the power of volunteering.
            </p>
            <div className="flex space-x-2 mb-6">
              <a href="https://github.com/arevaura" target="_blank" rel="noopener noreferrer">
                <img src="/icon1.png" alt="Profile 1" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/jennyuxi" target="_blank" rel="noopener noreferrer">
                <img src="/icon2.png" alt="Profile 2" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/fanxiaotuGod" target="_blank" rel="noopener noreferrer">
                <img src="/icon3.png" alt="Profile 3" className="w-10 h-10 rounded-full" />
              </a>
              <a href="https://github.com/0r0chic0" target="_blank" rel="noopener noreferrer">
                <img src="/icon4.png" alt="Profile 4" className="w-10 h-10 rounded-full" />
              </a>
            </div>
          </div>


          <div>
            <img src="/graph.png" alt="Distribution Graph"/>
            <p className="text-lg text-gray-700 mb-6">
              According to the data collected by Food Stash, the redistribution of food is higher during the 
              summer and lower in the winter. However, there is a sharp increase in December when Christmas 
              donations rise. good2go leverages the network of community volunteers to mitigate the drop in 
              distribution rates by helping deliver food supplies.
            </p>
          </div>
        </section>

        <section className="space-y-6 justify-center">
          
        </section>
      </main>
    </div>
  );
}
