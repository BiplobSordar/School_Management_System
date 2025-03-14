

import { capitalizeFirstLetter } from "@/lib/utils";

const layouts = {
    student: ["Dashboard", "Courses", "Assignments", "Profile"],
    parent: ["Dashboard", "Child Progress", "Payments", "Messages"],
    admin: ["Dashboard", "Manage Users", "Settings", "Reports"],
    teacher: ["Dashboard", "My Classes", "Assignments", "Reports"],
};

const Sidebar = ({ role }) => {
    
    return (
       <>
          <h2 className="text-2xl font-bold mb-5">{capitalizeFirstLetter(role)} Panel</h2>
            <nav >
                <ul className="space-y-3">
                    {layouts[role].map((item) => (
                        <li
                            key={item}
                            className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
       </>
         
       
       
    );
};


export default Sidebar



