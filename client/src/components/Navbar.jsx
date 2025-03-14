import { useState } from "react";
// import  Link  from "react-router-dom";
import { Menu, X } from "lucide-react"; // For icons (install lucide-react if not installed)
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import userImage from '../assets/user.png'
import { useSelector } from "react-redux";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useLogoutMutation } from "@/app/api/auth";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="School Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">School SMS</span>
          </div>


          {/* Desktop Links */}
          <div className="hidden text-white md:flex space-x-6">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/students">Students</NavLink>
            <NavLink to="/teachers">Teachers</NavLink>
            <NavLink to="/classes">Classes</NavLink>
            <NavLink to="/attendance">Attendance</NavLink>
            <NavLink to="/exams">Exams</NavLink>
          </div>

          {/* User Profile + Mobile Menu Button */}
          <div className="flex items-center  space-x-4">
            {/* User Profile (placeholder - can replace with real user data) */}

            {user && isAuthenticated ? <><div className="hidden md:flex items-center space-x-2">
              <img
                src={userImage}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-white text-xl">{capitalizeFirstLetter(user?.role)}</span>
            </div>
              <div className="hidden md:block">
                <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                  Logout
                </button>
              </div>
            </> : <div className="hidden  md:flex space-x-4">
              <button onClick={() => navigate('/registation')} className="px-4 py-2 rounded-xl border bg-white border-blue-500 text-blue-500 font-bold hover:bg-blue-500 hover:text-white transition duration-300">
                Register
              </button>
              <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </div>}



            {/* Hamburger Menu - Mobile */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Collapsible) */}

        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 p-5 shadow-lg transition-transform duration-300 ease-in-out 
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
        >
          <div className="mb-5">
            {user && isAuthenticated && <div className="flex items-center space-x-2 mt-4">
              <img src={userImage} alt="User Avatar" className="h-8 w-8 rounded-full" />
              <span className="text-white text-xl">Admin</span>
            </div>}
          </div>
          <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
          <MobileNavLink to="/students">Students</MobileNavLink>
          <MobileNavLink to="/teachers">Teachers</MobileNavLink>
          <MobileNavLink to="/classes">Classes</MobileNavLink>
          <MobileNavLink to="/attendance">Attendance</MobileNavLink>
          <MobileNavLink to="/exams">Exams</MobileNavLink>
          <br />
          {
            user && isAuthenticated ? <>
              <div>
                <button onClick={handleLogout} className="px-4 py-2 mt-5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                  Logout
                </button>
              </div>
            </> : <>
              <button onClick={() => navigate('/registation')} className="px-4 mr-2 py-2 rounded-xl border bg-white border-blue-500 text-blue-500 font-bold hover:bg-blue-500 hover:text-white transition duration-300">
                Register
              </button>
              <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                Login
              </button>
            </>
          }


        </div>


      </div>
    </nav>
  );
};

// Helper Components for Nav Links
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-white text-xl hover:text-blue-600 transition duration-300"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-white hover:bg-blue-50 py-2 px-4 rounded-lg transition duration-300"
  >
    {children}
  </Link>
);

export default Navbar;
