import React from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const ParentDashboard = () => {
    const userRole = localStorage.getItem("user.role");
    console.log("User Role:", userRole); // Debugging line
  
    if (userRole === "admin") {
        return <AdminDashboard />;
    }
     if (userRole === "user") {
        return <UserDashboard />;
    }

};

export default ParentDashboard;