import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, TrendingUp, Package } from "lucide-react";
import "../css/lowstock.css";

function LowStock() {
  const mockProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      sku: "MED001",
      category: "Medicine",
      supplier: "Pharma Supplier",
      quantity: 10,
      minStock: 30,
    },
    {
      id: 2,
      name: "Rice (25kg Bag)",
      sku: "FOOD002",
      category: "Food",
      supplier: "Farm Supplier",
      quantity: 15,
      minStock: 25,
    },
    {
      id: 3,
      name: "Cooking Oil (5L)",
      sku: "FOOD003",
      category: "Food",
      supplier: "Oil Distributor",
      quantity: 40,
      minStock: 50,
    },
    {
      id: 4,
      name: "Amoxicillin 250mg",
      sku: "MED004",
      category: "Medicine",
      supplier: "Health Supply",
      quantity: 5,
      minStock: 30,
    },
  ];

  const lowStockProducts = mockProducts.filter(
    (p) => p.quantity <= p.minStock
  );

  const criticalStock = lowStockProducts.filter(
    (p) => p.quantity <= p.minStock * 0.5
  );

  return (
    <div className="lowstock-page">
      <div className="lowstock-container">
        {/* Header */}
        <div className="page-header">
          <h2>Low Stock Alerts</h2>
          <p>Monitor products that need restocking</p>
        </div>

        {/* Summary */}
        <div className="summary-grid">
          <div className="summary-card orange">
            <AlertTriangle size={35} />
            <div>
              <h3>{lowStockProducts.length}</h3>
              <p>Low Stock Items</p>
            </div>
          </div>

          <div className="summary-card red">
            <AlertTriangle size={35} />
            <div>
              <h3>{criticalStock.length}</h3>
              <p>Critical Stock</p>
            </div>
          </div>

          <div className="summary-card green">
            <Package size={35} />
            <div>
              <h3>{mockProducts.length - lowStockProducts.length}</h3>
              <p>Healthy Stock</p>
            </div>
          </div>
        </div>

        {/* Critical Alert */}
        {criticalStock.length > 0 && (
          <div className="card critical-card">
            <h3>
              <AlertTriangle size={20} />
              Critical Stock Levels
            </h3>

            {criticalStock.map((product) => (
              <div className="critical-item" key={product.id}>
                <div className="product-info">
                  <Package />
                  <div>
                    <h4>{product.name}</h4>
                    <p>SKU: {product.sku}</p>
                  </div>
                </div>

                <div className="critical-right">
                  <div>
                    <strong>
                      {product.quantity} / {product.minStock}
                    </strong>
                  </div>

                  <Link to="/stockin">
                    <button className="restock-btn">
                      <TrendingUp size={18} />
                      Restock
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table */}
        <div className="card">
          <h3>Low Stock Products ({lowStockProducts.length})</h3>

          {lowStockProducts.length > 0 ? (
            <div className="table-wrapper">
              <table className="stock-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Current</th>
                    <th>Minimum</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {lowStockProducts.map((product) => {
                    const isCritical =
                      product.quantity <= product.minStock * 0.5;

                    return (
                      <tr key={product.id}>
                        <td>
                          <strong>{product.name}</strong>
                          <small>{product.supplier}</small>
                        </td>

                        <td>{product.sku}</td>
                        <td>{product.category}</td>
                        <td>{product.quantity}</td>
                        <td>{product.minStock}</td>

                        <td>
                          <span
                            className={`status ${
                              isCritical ? "critical" : "low"
                            }`}
                          >
                            {isCritical ? "Critical" : "Low"}
                          </span>
                        </td>

                        <td>
                          <Link to="/stockin">
                            <button className="restock-btn small">
                              Restock
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <Package size={50} />
              <h3>All Products Have Healthy Stock</h3>
              <p>No product is below minimum stock level.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LowStock;