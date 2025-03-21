import React, { useState } from "react";

const FilterUser = ({ role, filters, setFilters }) => {
  console.log(filters, 'this is the filters')
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-2">Search</label>
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Conditionally render filters based on the selected role */}
      {role === "student" && (
        <>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Class</label>
            <select
              value={filters.grade}
              onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>

            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Section</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value=''>Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Group</label>
            <select
              value={filters.group}
              onChange={(e) => setFilters({ ...filters, group: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value=''>Select Group</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div> */}
        </>
      )}

      {role === "teacher" && (
        <>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Department</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value=''>Select Department</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Experience Level</label>
            <select
              value={filters.experience}
              onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value=''>Select Experience Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </>
      )}

      {role === "parent" && (
        <>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Student Name</label>
            <input
              type="text"
              placeholder="Enter student name..."
              value={filters.studentName}
              onChange={(e) => setFilters({ ...filters, studentName: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              placeholder="Enter contact number..."
              value={filters.contactNumber}
              onChange={(e) => setFilters({ ...filters, contactNumber: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </>
      )}

      {role === "admin" && (
        <>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Role</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value=''>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Parent">Parent</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterUser;
