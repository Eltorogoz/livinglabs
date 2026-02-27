import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Help() {
  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      src: "https://www.purdue.edu/polytechnic/livlab/wp-content/uploads/2024/10/Britney-Ho_JU17051.jpg",
      alt: "Student working at desk",
    },
    {
      id: 2,
      src: "https://www.purdue.edu/polytechnic/livlab/wp-content/uploads/2024/10/2024_GMB5751.jpg",
      alt: "Students collaborating",
    },
    {
      id: 3,
      src: "https://www.purdue.edu/polytechnic/livlab/wp-content/uploads/2023/10/2023_KAL_0156.jpg",
      alt: "Living lab presentation",
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      
      {/* Header (Kept Identical to Documents.js) */}
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <img src="/images/PurdueLogo.svg" alt="Purdue University" className="h-12" />
          <span className="text-lg font-medium">Living Lab Purdue University</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/documents" className="hover:text-yellow-600">Documents</Link>
          <Link to="/projects" className="hover:text-yellow-600">Projects</Link>
          <Link to="/faq" className="hover:text-yellow-600">FAQ</Link>
          <Link to="/help" className="hover:text-yellow-600">Help</Link>
        </nav>

        <div className="w-6 h-6">🔍</div>
      </header>

      {/* Page Title */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-medium">Help & Enrollment</h1>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 pb-20 flex flex-col items-center flex-grow w-full">
        
        {/* === SLIDESHOW SECTION === */}
        <div className="relative w-full max-w-4xl h-64 md:h-96 mb-12 rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              {/* Optional Dark Overlay for better contrast */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#DAAA00] w-6" // Active dot gets wider and gold
                    : "bg-white opacity-70 hover:opacity-100"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        {/* === END SLIDESHOW SECTION === */}

        
        {/* Informational Text */}
        <div className="max-w-3xl text-left mb-14 space-y-5 text-gray-800 leading-relaxed">
          <h2 className="text-2xl font-bold text-black">Need to fulfill your RISE requirement for graduation?</h2>
          <p>
            The Living Lab at Purdue University Indianapolis provides RISE eligible projects, internship, and service learning opportunities. Whether your major is Networking, Security, Web Development, OLS, or Computer Graphics Technology, the Living Lab at Purdue University Indianapolis provides you the opportunity to fulfill RISE requirements while developing resume-worthy experience. Check out the projects by type from the <Link to="/" className="text-[#DAAA00] hover:underline font-medium">Home Page</Link> for a preview of projects that Living Lab students work on.
          </p>
          <p>
            Class meetings are from 9 AM to 5 PM on Fridays each week (a one-hour lunch break and two 15-minute breaks built into the schedule for each day) emulating a standard work environment. Project check-in meetings are <strong>REQUIRED</strong> and will be conducted weekly on Fridays. Alternate project schedules may be considered but require instructor approval before enrollment.
          </p>
          <p>
            If you would like to learn more, or would like to request acceptance into Living Lab, simply fill out the contact form below.
          </p>
        </div>

        {/* Tailwind-Converted Student Form */}
        <div className="w-full max-w-2xl bg-white p-8 md:p-10 border-2 border-[#B28F4A] shadow-sm rounded-md mb-10">
          <h2 className="text-2xl font-bold mb-6 text-black border-b pb-4">Student Information Form</h2>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-bold text-black mb-2">First and Last Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                required 
                className="w-full p-3 border border-black rounded-lg bg-gray-50 text-base outline-none focus:ring-2 focus:ring-[#B28F4A] transition" 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-bold text-black mb-2">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                required 
                className="w-full p-3 border border-black rounded-lg bg-gray-50 text-base outline-none focus:ring-2 focus:ring-[#B28F4A] transition" 
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-bold text-black mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                required 
                className="w-full p-3 border border-black rounded-lg bg-gray-50 text-base outline-none focus:ring-2 focus:ring-[#B28F4A] transition" 
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-bold text-black mb-2">Message</label>
              <textarea 
                id="message"
                name="message" 
                rows="5" 
                className="w-full p-3 border border-black rounded-lg bg-gray-50 text-base outline-none focus:ring-2 focus:ring-[#B28F4A] transition resize-y"
              ></textarea>
            </div>

            <div className="text-center sm:text-left">
              <button 
                type="submit" 
                className="bg-[#B28F4A] text-black px-8 py-3 rounded-lg font-bold cursor-pointer hover:bg-black hover:text-[#B28F4A] transition-colors duration-300 w-full sm:w-auto shadow-md"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-600 border-t mt-auto">
        <p>© {new Date().getFullYear()} Purdue University. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Help;
