import { useEffect } from "react";
import {Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children:React.ReactNode;
    allowedRoles:string[];
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({children,allowedRoles})=>{
    const role = localStorage.getItem("role");
    console.log(role);
    if(!role)
    {
        return <Navigate to="/login"/>
    }

  
    return <>{children}</>

};

export default ProtectedRoute;