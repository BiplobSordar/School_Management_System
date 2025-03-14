import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                {/* Footer Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="mb-8 ">
                        <h3 className="text-xl font-semibold mb-4 text-yellow-400">About Us</h3>
                        <p className="text-sm text-gray-300 overflow-hidden">
                            Our School Management System is designed to streamline school operations, enhance communication, and provide a seamless experience for students, parents, and staff.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h3>
                        <ul className="space-y-2">
                            
                            <li><Link href="/" className="text-gray-300 hover:text-yellow-400 transition duration-300">Home</Link></li>
                            <li><Link href="/admissions" className="text-gray-300 hover:text-yellow-400 transition duration-300">Admissions</Link></li>
                            <li><Link href="/calendar" className="text-gray-300 hover:text-yellow-400 transition duration-300">Calendar</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition duration-300">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-300 hover:text-yellow-400 transition duration-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-gray-300">
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                123 School St, EduCity, EC 12345
                            </li>
                            <li className="flex items-center text-gray-300">
                                <i className="fas fa-phone mr-2"></i>
                                +1 (234) 567-8901
                            </li>
                            <li className="flex items-center text-gray-300">
                                <i className="fas fa-envelope mr-2"></i>
                                info@schoolmanagement.com
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-yellow-400">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">

                                <Facebook />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">

                                <Twitter />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">

                                <Instagram />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-yellow-400 transition duration-300">

                                <Linkedin />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="grid grid-cols-1 border-t border-gray-700 ">
                    <p className="text-sm  text-gray-300">
                        &copy; 2023 School Management System. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;