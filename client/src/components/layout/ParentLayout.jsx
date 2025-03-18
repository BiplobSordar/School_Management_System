import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { Menu, X } from "lucide-react"; 
const ParentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  return (
    <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 min-h-screen w-60 bg-gray-900 text-white p-5 shadow-lg transition-transform duration-300 ease-in-out 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    sm:translate-x-0 sm:static sm:w-60`}
            >
                <Sidebar role="parent" />
                
                {/* Close button for small screens */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="sm:hidden absolute top-16 right-5 text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </aside>

            {/* Sidebar Toggle Button (Only for Small Screens) */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`sm:hidden opacity-45 focus:opacity-100 fixed top-20 right-5 z-50 p-2 bg-gray-800 rounded-md text-white ${isSidebarOpen?'hidden':''}`}
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Main Content */}
            <div
                className={`flex-1 p-5 bg-gray-100 transition-all duration-300 ${
                    isSidebarOpen ? "opacity-100 sm:opacity-100" : "opacity-100"
                }`}
                onClick={() => isSidebarOpen && setIsSidebarOpen(false)} // Close sidebar when clicking content
            >
                <Outlet />
            </div>
        </div>
  )
}

export default ParentLayout