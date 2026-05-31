import React from "react";
import Navbar from "../Navbar";
// import Sidebar from "./Sidebar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
     <div className="main">
      <Navbar />
      <div className="main-dashboard">
        <Sidebar />
       <main className="main-wrapper">
        <Outlet />
       </main>
      
      </div>

     
    </div>
  )
}
export default AdminLayout;
