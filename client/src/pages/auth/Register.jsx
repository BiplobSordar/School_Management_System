
import React, { useState } from "react";
import StudentForm from "../../components/forms/registationFrom/StudentRegisterForm";
import ParentForm from "@/components/forms/registationFrom/ParentRegisterForm";
import { Link, Navigate } from "react-router-dom";
import TeacherRegistrationForm from "@/components/forms/registationFrom/TeacherRegisterForm";
import AdminRegistrationForm from "../../components/forms/registationFrom/AdminRegisterForm";
import ParentRequestForm from "@/components/forms/registationFrom/ParentRegisterForm";
import { useSelector } from "react-redux";
let role = ['admin', 'student', 'teacher', 'parent']

const RegistrationPage = () => {
    const [activeForm, setActiveForm] = useState("student");
    const {isAuthenticated}=useSelector((state)=>state.auth)

    const renderForm = () => {
        switch (activeForm) {
            case "admin":
                return <AdminRegistrationForm />;
            case "student":
                return <StudentForm />;
            case "teacher":
                return <TeacherRegistrationForm />;
            case "parent":
                return <ParentRequestForm />;
            default:
                return <StudentForm />;
        }
    };


    if(isAuthenticated) return <Navigate to='/' replace/>
    return (



        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-5xl bg-gray-900 rounded shadow-lg p-6 my-10">
                {/* Card Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Registration</h1>
                </div>

                {/* Role Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {role.map((role) => (
                        <button
                            key={role}
                            onClick={() => setActiveForm(role)}
                            className={`px-6 py-2 rounded transition-all duration-300 ${activeForm === role
                                ? 'bg-yellow-400 text-gray-900 font-semibold'
                                : 'bg-gray-700 text-white border border-gray-600 hover:border-yellow-400'
                                }`}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="space-y-4 ">
                    {renderForm()}

                </div>
                {/* Link to Login Page */}
                <div className="text-center mt-4">
                    <p className="text-gray-300">
                        Already registered?{' '}
                        <Link to="/login" className="text-yellow-400 hover:underline">
                            Login here
                        </Link>

                    </p>
                    <p className="text-gray-300 mt-2">
                        Want To Go Home Page?
                        <Link to="/" className="text-yellow-400 hover:underline">
                            Home
                        </Link>

                    </p>
                </div>
            </div>
        </div>



    );
};

export default RegistrationPage;
