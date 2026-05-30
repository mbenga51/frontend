import React from "react";
// import "../RecentTransactions.css";

const data = [
  {
    product: "Paracetamol 500mg",
    type: "in",
    quantity: 200,
    date: "3/20/2025",
    user: "Admin User",
  },
  {
    product: "Rice (25kg Bag)",
    type: "out",
    quantity: 25,
    date: "3/22/2025",
    user: "Staff User",
  },
  {
    product: "Cooking Oil (5L)",
    type: "in",
    quantity: 50,
    date: "3/21/2025",
    user: "Admin User",
  },
  {
    product: "Paracetamol 500mg",
    type: "out",
    quantity: 50,
    date: "3/23/2025",
    user: "Staff User",
  },
  {
    product: "Amoxicillin 250mg",
    type: "out",
    quantity: 20,
    date: "3/19/2025",
    user: "Staff User",
  },
];

const RecentTransactions = () => {
  return (
    <div className="transactions-container">
      <h2>Recent Transactions</h2>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Performed By</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>

              <td>
                <span
                  className={
                    item.type === "in" ? "badge in" : "badge out"
                  }
                >
                  {item.type === "in" ? "↗ Stock In" : "↘ Stock Out"}
                </span>
              </td>

              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td>{item.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;