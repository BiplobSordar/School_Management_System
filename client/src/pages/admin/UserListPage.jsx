import { useGetUserListsByRoleMutation } from "@/app/api/adminApi";
import FilterUser from "@/components/Filter";
import React, { useState, useEffect } from "react";
import LoadingPage from "../Loading";
import debounce from "lodash.debounce";
import { NavLink } from "@/components/Navbar";



const UserListPage = () => {

  const [role, setRole] = useState("student"); // Role for filtering the user list

  const [getUserListsByRole, { data, isLoading, isSuccess }] = useGetUserListsByRoleMutation()


  // Define roles in an array
  const roleOptions = ["student", "teacher", "parent", "admin"];



  const [filters, setFilters] = useState({
    search: "",
    grade: "",
    section: "",
    group: "",
    department: "",
    experience: "",
    studentName: "",
    contactNumber: "",
    role: "student", // Role for Admin
    studentAdmissionNumber: ''
  });


  // Debounce the function to reduce API calls on each keystroke
  const debouncedFetchUsers = debounce(getUserListsByRole, 1000);

 

  useEffect(() => {
    debouncedFetchUsers(filters);

    // Cleanup function to cancel pending API call if filters change before delay ends
    return () => debouncedFetchUsers.cancel();
  }, [filters]);

  const handelRole = (e) => {
    setRole(e.target.value)
    setFilters({
      search: "",
      grade: "",
      section: "",
      group: "",
      department: "",
      experience: "",
      studentName: "",
      contactNumber: "",
      role: e.target.value, // Role for Admin
      studentAdmissionNumber: ''
    })
  }

  if (isLoading) return <LoadingPage />

  return (

    <div className="p-6 max-w-8xl mx-auto bg-gray-100 min-h-screen">
      {isLoading ? <LoadingPage /> : <>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Combined User List</h2>

        {/* Role Selection */}
        <div className="flex flex-wrap mb-6 gap-6">
          <label className="text-lg font-semibold text-gray-700 mb-2">Select Role(s):</label>

          <div className="flex items-center space-x-4">
            {roleOptions.map((roleName) => (
              <div key={roleName} className="flex items-center">
                <input
                  type="checkbox"
                  id={roleName}
                  value={roleName}
                  onChange={handelRole}
                  checked={roleName == role}
                  className="h-5 w-5 border-gray-300 rounded-xl text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={roleName} className="ml-2 text-sm font-medium text-gray-800">
                  {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Component */}
        {role && (
          <FilterUser role={role} filters={filters} setFilters={setFilters} />
        )}

        {/* Display the filtered users */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} List` : "User List"}
          </h3>

          {data?.users.length > 0 ? (
            <ul className="space-y-4">
              {data?.users?.map((user) => (
              <NavLink to={`/admin/profile/${user.id}`}>

             
                <li
                  key={user.id}
                  className="p-4 border my-1 rounded-lg flex items-center hover:bg-indigo-50 transition duration-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <p className="font-semibold text-lg text-gray-800">{user.first_name} {user.last_name} </p>
                    {role === "student" && (
                      <p className="text-sm text-gray-600">
                        Class: {user.grade} | Section: {user.section} | Group: {user.group}
                      </p>
                    )}
                    {role === "teacher" && (
                      <p className="text-sm text-gray-600">
                        Department: {user.department} | Experience: {user.experience}
                      </p>
                    )}
                    {role === "parent" && (
                      <p className="text-sm text-gray-600">
                        Student: {user.studentName} | Contact: {user.contactNumber}
                      </p>
                    )}
                    {role === "admin" && (
                      <p className="text-sm text-gray-600">Role: {user.role}</p>
                    )}
                  </div>
                </li>
                </NavLink>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">No users found</div>
          )}
        </div>
      </>}

    </div>
  );
};

export default UserListPage;
