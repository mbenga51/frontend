import React, { useEffect, useState } from "react";
import "../css/stockin.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Edit, Trash2 } from "lucide-react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const StockIn = () => {
  const initialValues = {
    product_id: "",
    quantity: "",
    note: "",
  };

  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        // console.log("product.", response.data);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);
  const data = [
    {
      id: "1",
      productName: "Paracetamol 500mg",
      quantity: 200,
      date: "2025-03-20 10:30",
      performedBy: "Admin User",
      notes: "Monthly stock replenishment",
    },
    {
      id: "2",
      productName: "Rice (25kg Bag)",
      quantity: 25,
      date: "2025-03-22 14:15",
      performedBy: "Staff User",
      notes: "Customer order #1234",
    },
    {
      id: "3",
      productName: "Cooking Oil (5L)",
      quantity: 50,
      date: "2025-03-21 09:00",
      performedBy: "Admin User",
      notes: "New shipment",
    },
  ];
  // fetch transactions
  // fetch transactions
  const token=localStorage.getItem("token");
useEffect(() => {
  const fetchtransactions = async () => {
    try {
      const res = await api.get("/stock-in/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("transactions", res.data);
      setTransactions(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchtransactions(); // call the function here
}, [token]);
  const validationSchema = Yup.object({
    product_id: Yup.string().required("Please select a product"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required")
      .positive("Quantity must be greater than 0")
      .integer("Quantity must be a whole number"),
    note: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/stock-in", values, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Stock added successfully");

      resetForm();
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error("Failed to add stock");
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="stock-page">
      <div className="stock-wrapper">
        {/* Form Card */}
        <div className="stockin-card">
          <h2>Add Stock In Transaction</h2>
          <p className="subtitle">Record new inventory coming into stock</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="stock-in-form">
              <div className="row-stock-in">
                <div className="input-group">
                  <label>Select Product</label>

                  <Field as="select" name="product_id">
                    <option value="">Choose a product</option>
                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >{`${product.name}(${product.product_number})-current:${
                        product.quantity
                      }`}</option>
                    ))}
                  </Field>

                  <ErrorMessage
                    name="product"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="input-group">
                  <label>Quantity</label>

                  <Field
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                  />

                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Notes (Optional)</label>

                <Field
                  as="textarea"
                  name="note"
                  rows="5"
                  placeholder="Add notes..."
                />
              </div>

              <button type="submit">Add Stock</button>
            </Form>
          </Formik>
        </div>

        {/* Table Card */}
        <div className="table-card">
          <h2>Stock Transactions</h2>

          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Performed By</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.created_at}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.username}</td>
                    <td>{item.note}</td>
                    <td className="actions">
                      <button className="icon-btn delete">
                        <Trash2 size={18} />
                      </button>

                      <button className="icon-btn edit">
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIn;
