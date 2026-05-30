import React from "react";

import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Package,
} from "lucide-react";

import "../css/reports.css";

function Reports() {

  // MOCK PRODUCTS

  const mockProducts = [
    { id: 1, name: "Rice", quantity: 40, price: 450, minStock: 20 },
    { id: 2, name: "Sugar", quantity: 12, price: 300, minStock: 20 },
    { id: 3, name: "Oil", quantity: 25, price: 500, minStock: 15 },
    { id: 4, name: "Soap", quantity: 8, price: 120, minStock: 10 },
  ];

  // MOCK TRANSACTIONS

  const mockTransactions = [
    { type: "in", quantity: 200 },
    { type: "in", quantity: 150 },
    { type: "out", quantity: 80 },
    { type: "out", quantity: 40 },
  ];

  // MOCK CATEGORIES

  const mockCategories = [
    "Food",
    "Medicine",
    "Cleaning",
    "Electronics",
  ];

  // CALCULATIONS

  const totalProducts = mockProducts.length;

  const totalValue = mockProducts.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const stockInTotal = mockTransactions
    .filter((item) => item.type === "in")
    .reduce((sum, item) => sum + item.quantity, 0);

  const stockOutTotal = mockTransactions
    .filter((item) => item.type === "out")
    .reduce((sum, item) => sum + item.quantity, 0);

  const lowStockCount = mockProducts.filter(
    (item) => item.quantity <= item.minStock
  ).length;

  // REPORT BUTTON

  const handleGenerateReport = (type) => {
    alert(`Generating ${type} report...`);
  };

  // REPORT DATA

  const reports = [
    {
      title: "Stock Level Report",
      icon: <Package size={22} />,
      color: "blue",
      desc: "Detailed report of current stock levels for all products.",
      items: [
        "Product names and SKUs",
        "Current stock quantities",
        "Minimum stock levels",
        "Stock status indicators",
      ],
    },

    {
      title: "Stock Movement Report",
      icon: <TrendingUp size={22} />,
      color: "green",
      desc: "Comprehensive stock-in and stock-out transaction report.",
      items: [
        "Transaction history",
        "Stock-in activities",
        "Stock-out activities",
        "Date and time stamps",
      ],
    },

    {
      title: "Category Report",
      icon: <FileText size={22} />,
      color: "purple",
      desc: "Analysis of inventory distribution by categories.",
      items: [
        "Products by category",
        "Category-wise stock value",
        "Distribution analysis",
        "Performance metrics",
      ],
    },

    {
      title: "Low Stock Alert Report",
      icon: <TrendingDown size={22} />,
      color: "orange",
      desc: "Products below minimum stock levels requiring action.",
      items: [
        "Low stock products",
        "Critical stock levels",
        "Reorder recommendations",
        "Priority indicators",
      ],
    },

    {
      title: "Inventory Valuation Report",
      icon: <Calendar size={22} />,
      color: "indigo",
      desc: "Financial report showing total inventory value.",
      items: [
        "Total inventory value",
        "Value by category",
        "Product valuation",
        "Financial summary",
      ],
    },

    {
      title: "Supplier Report",
      icon: <FileText size={22} />,
      color: "teal",
      desc: "Products organized by supplier with performance data.",
      items: [
        "Products by supplier",
        "Supplier performance",
        "Stock-in history",
        "Contact information",
      ],
    },
  ];

  return (
    <div className="reports-page">

      <div className="reports-container">

        {/* HEADER */}

        <div className="reports-header">
          <h1>Reports</h1>
          <p>Generate and export inventory reports</p>
        </div>

        {/* SUMMARY */}

        <div className="summary-card">

          <div className="summary-top">

            <div className="summary-title">
              <FileText size={22} />
              Inventory Summary Report
            </div>

            <button
              className="export-btn"
              onClick={() =>
                handleGenerateReport("Inventory Summary")
              }
            >
              <Download size={18} />
              Export Summary
            </button>

          </div>

          <div className="summary-grid">

            <div className="summary-item">
              <p>Total Products</p>
              <h2>{totalProducts}</h2>
            </div>

            <div className="summary-item">
              <p>Total Inventory Value</p>
              <h2>GMD {totalValue.toLocaleString()}</h2>
            </div>

            <div className="summary-item">
              <p>Product Categories</p>
              <h2>{mockCategories.length}</h2>
            </div>

            <div className="summary-item">
              <p>Low Stock Items</p>
              <h2 className="orange">{lowStockCount}</h2>
            </div>

            <div className="summary-item">
              <p>Total Stock In</p>
              <h2 className="green">{stockInTotal}</h2>
            </div>

            <div className="summary-item">
              <p>Total Stock Out</p>
              <h2 className="red">{stockOutTotal}</h2>
            </div>

          </div>
        </div>

        {/* REPORTS GRID */}

        <div className="reports-grid">

          {reports.map((report, index) => (

            <div className="report-card" key={index}>

              <div className="report-header">

                <div className={`report-icon ${report.color}`}>
                  {report.icon}
                </div>

                <h2>{report.title}</h2>

              </div>

              <p className="report-desc">
                {report.desc}
              </p>

              <ul className="report-list">

                {report.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}

              </ul>

              <button
                className="report-btn"
                onClick={() =>
                  handleGenerateReport(report.title)
                }
              >
                <Download size={18} />
                Generate Report
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Reports;