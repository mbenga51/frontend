import React, { useState } from "react";
import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="main">
     
          <div className="header-section">
            <h2>Dashboard</h2>
            <p>Overview of your inventory management system</p>
          </div>
          {/* card section */}
          <div className="card-section">
            <div className="card">
              <div className="icon">
                <h3>Total Products</h3>
                <Package size={24} color="green" />
              </div>

              <p>150</p>
              <span>Active items in inventory</span>
            </div>
            <div className="card">
              <div className="icon">
                <h3>Total Value</h3>
                <Package size={24} color="blue" />
              </div>

              <p>GMD 75,000</p>
              <span>Total value of inventory</span>
            </div>
            <div className="card">
              <div className="icon">
                <h3>Low Stock Items</h3>
                <AlertTriangle size={24} color="orange" />
              </div>

              <p>50</p>
              <span>Items with low stock levels</span>
            </div>
            <div className="card">
              <div className="icon">
                <h3>Recent Transactions</h3>
                <TrendingUp size={24} color="green" />
              </div>
              <p>25</p>
              <span>Recent sales and purchases</span>
            </div>
          </div>
           {/* table */}
        <RecentTransactions />
        </div>
      
      
  );
};

export default Dashboard;
