import React from "react";
import { Package, Menu, X, LogOut } from "lucide-react";
import "../Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    // Remove auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");

    // Redirect to login page
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo">
          <Package />
        </div>
        <div className="title">
          <h1>Inventory System</h1>
          <p>SME Management</p>
        </div>
      </div>
      {/* users details  */}
      <div className="user-profile">
        <div className="user-info">
          <p>John Doe</p>
          <span>Admin</span>
        </div>
        <div className="user-avatar">JD</div>

        <button className="logout" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
