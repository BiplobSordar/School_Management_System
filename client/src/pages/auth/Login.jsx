import AdminLoginForm from "@/components/forms/loginForm/AdminLoginForm";
import ParentLoginForm from "@/components/forms/loginForm/ParentLoginForm";
import StudentLoginForm from "@/components/forms/loginForm/StudentLoginForm";
import TeacherLoginForm from "@/components/forms/loginForm/TeacherLoginForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useSearchParams } from "react-router-dom";

const RoleBasedLogin = () => {
  const {isAuthenticated}=useSelector((state)=>state.auth)
  const [role,setRole]=useState('student')
  const [usePrams]=useSearchParams()
  

  useEffect(()=>{
    let role=usePrams.get('role')
  if(role){
    setRole(role)
  }
  },[])
  if(isAuthenticated) return <Navigate to='/' replace/>

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Login</h1>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["student", "teacher", "parent", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded transition-all duration-300 ${role === r
                  ? 'bg-yellow-400 text-gray-900 font-semibold'
                  : 'bg-gray-700 text-white border border-gray-600 hover:border-yellow-400'
                }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
        {role === "student" && <StudentLoginForm />}
        {role === "teacher" && <TeacherLoginForm />}
        {role === "parent" && <ParentLoginForm />}
        {role === "admin" && <AdminLoginForm />}
      </div>
      {/* Link to Login Page */}
      <div className="text-center mt-4">
        <p className="text-gray-300">
          Already registered?{' '}
          <Link to="/registation" className="text-yellow-400 hover:underline">
            Register Here
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
    
  );
};

export default RoleBasedLogin;
