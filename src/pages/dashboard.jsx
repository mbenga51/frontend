import React, { useState } from "react";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RecentTransactions from "../components/RecentTransactions";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="dashboard">
     
    </div>
      
  );
};

export default Dashboard;
