
import AnnouncementSection from "@/components/AnnouncementSection";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingPage from "./Loading";

const LandingPage = () => {

  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user?.email)
  console.log(isAuthenticated)
  // if(!user) return <LoadingPage/>
  return (
    <div className="bg-gray-50">
      {/* {Announcement Section} */}
     
      <AnnouncementSection/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Simplify School Management with <span className="text-yellow-300">SchoolPro</span>
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            A modern, all-in-one solution for managing students, teachers, parents, and school
            operations.
          </p>
          <div className="space-x-4">
           
            <Link to=''  className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">Explore Features</Link>
            <Link to=''  className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Student Management</h3>
              <p className="text-gray-600">
                Easily manage student records, attendance, and academic performance.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 text-4xl mb-4">👩‍🏫</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Teacher Portal</h3>
              <p className="text-gray-600">
                Empower teachers with tools for lesson planning, grading, and communication.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="text-blue-500 text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Parent Access</h3>
              <p className="text-gray-600">
                Keep parents informed with real-time updates on their child's progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "SchoolPro has transformed the way we manage our school. It's intuitive, powerful, and
                saves us so much time!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">John Doe</h4>
                  <p className="text-gray-500">Principal, Greenfield School</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "The parent portal is a game-changer. I can now track my child's progress in
                real-time."
              </p>
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Jane Smith</h4>
                  <p className="text-gray-500">Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Basic</h3>
              <p className="text-gray-600 mb-4">Perfect for small schools</p>
              <p className="text-4xl font-bold text-blue-500 mb-4">$49<span className="text-lg">/mo</span></p>
              <ul className="text-gray-600 mb-6">
                <li>Up to 100 Students</li>
                <li>Basic Reporting</li>
                <li>Email Support</li>
              </ul>
              <a
                href="#"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Get Started
              </a>
            </div>
            {/* Plan 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center border-2 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pro</h3>
              <p className="text-gray-600 mb-4">Best for medium-sized schools</p>
              <p className="text-4xl font-bold text-blue-500 mb-4">$99<span className="text-lg">/mo</span></p>
              <ul className="text-gray-600 mb-6">
                <li>Up to 500 Students</li>
                <li>Advanced Reporting</li>
                <li>Priority Support</li>
              </ul>
              <a
                href="#"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Get Started
              </a>
            </div>
            {/* Plan 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large institutions</p>
              <p className="text-4xl font-bold text-blue-500 mb-4">$199<span className="text-lg">/mo</span></p>
              <ul className="text-gray-600 mb-6">
                <li>Unlimited Students</li>
                <li>Custom Reporting</li>
                <li>24/7 Support</li>
              </ul>
              <a
                href="#"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default LandingPage;