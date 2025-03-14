import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children,role }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
console.log('is authenticated,',isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if(role!==user?.role){
  return <Navigate to='/' replace />
  }

 

  return children
};

export default ProtectedRoute;
