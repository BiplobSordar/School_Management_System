

import { capitalizeFirstLetter } from "@/lib/utils";
import { Link } from "react-router-dom";

const layouts = {
    student: [
        { name: "Dashboard", path: "/student/dashboard" },
        { name: "Courses", path: "/student/courses" },
        { name: "Assignments", path: "/student/assignments" },
        { name: "Profile", path: "/student/profile" }
    ],
    parent: [
        { name: "Dashboard", path: "/parent/dashboard" },
        { name: "Child Progress", path: "/parent/child_progress" },
        { name: "Payments", path: "/parent/payments" },
        { name: "Messages", path: "/parent/messages" }
    ],
    admin: [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Manage Users", path: "/admin/manage_users" },
        { name: "Settings", path: "/admin/settings" },
        { name: "Reports", path: "/admin/reports" },
        { name: "UserLists", path: "/admin/user_lists" }
    ],
    teacher: [
        { name: "Dashboard", path: "/teacher/dashboard" },
        { name: "My Classes", path: "/teacher/my_classes" },
        { name: "Assignments", path: "/teacher/assignments" },
        { name: "Reports", path: "/teacher/reports" }
    ]
};


const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-white text-xl hover:text-blue-600 transition duration-300"
    >
        {children}
    </Link>
);
const Sidebar = ({ role }) => {

    return (
        <div className="fixed h-screen">
            <h2 className="text-2xl font-bold mb-5">{capitalizeFirstLetter(role)} Panel</h2>
            <nav className="h-screen " >
                <ul className="space-y-3">
                    {layouts[role].map((item) => (
                        <li
                            key={item}
                            className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                        >
                            <NavLink to={item.path} >

                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>




    );
};


export default Sidebar



