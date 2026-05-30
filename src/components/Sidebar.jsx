import React,{useState} from "react";
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  FolderOpen,
  AlertTriangle,
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../Navbar.css";
const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/products", icon: Package, label: "Products" },
    { path: "/dashboard/stock-in", icon: TrendingUp, label: "Stock In" },
    { path: "/dashboard/stock-out", icon: TrendingDown, label: "Stock Out" },
    { path: "/dashboard/categories", icon: FolderOpen, label: "Categories" },
    { path: "/dashboard/low-stock-alerts", icon: AlertTriangle, label: "Low Stock Alerts" },
    { path: "/dashboard/reports", icon: FileText, label: "Reports" },
    { path: "/dashboard/settings", icon: Settings, label: "Settings" },
    { path: "/logout", icon: LogOut, label: "Logout" },
  ];

  return (
    <div className="sidebar">
      
      <ul>
        {
          navItems.map((item) => ( 
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? "active " : "links"}>
                <item.icon />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))
        }
        
      </ul>
    </div>
  );
};

export default Sidebar;    