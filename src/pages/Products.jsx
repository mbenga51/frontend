
import { useState,useEffect } from "react";

import {
  Plus,
  Edit,
  Trash2,
  Search,
  AlertCircle,
} from "lucide-react";

import "../css/product.css";
import api from "../api/axios";

function Products() {

  const [products, setProducts] = useState([]);
useEffect(()=>{
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
      console.log("product.",response.data)
    } catch (error) {

      console.log(error);
      alert("Failed to fetch products");
    }
  };
  fetchProducts();
}, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    product_number: "",
    category: "",
    quantity: "",
    minStock: "",
    price: "",
    supplier: "",
  });

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  const productData = {
    ...formData,
    quantity: Number(formData.quantity),
    minStock: Number(formData.minStock),
    price: Number(formData.price),
  };

  try {
    // UPDATE PRODUCT
    if (editingProduct) {
      const res = await api.put(
        `/products/${editingProduct.id}`,
        productData
      );

      alert(res.data.message);

      // update UI
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...productData, id: editingProduct.id }
            : p
        )
      );
    }

    // ADD PRODUCT
    else {
      const res = await api.post(
        "/products",
        productData
      );

      alert(res.data.message);

      // add new product to UI
      setProducts((prev) => [
        ...prev,
        {
          ...productData,
          id: res.data.id,
        },
      ]);
    }

    resetForm();
  } catch (error) {
    console.error(error);

    // SERVER ERROR MESSAGE
    const message =
      error.response?.data?.message ||
      "Something went wrong";

    console.log(message);
  }
};

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete?"
  );

  if (!confirmDelete) return;

  try {
    const res = await api.delete(`/products/${id}`);

    alert(res.data.message);

    setProducts((prev) =>
      prev.filter((p) => p.id !== id)
    );
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to delete product"
    );
  }
};

  const resetForm = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      product_number: "",
      category: "",
      quantity: "",
      minStock: "",
      price: "",
      supplier: "",
    });

    setShowModal(false);
  };

  return (
    <div className="products-page">
      <div className="top-bar">
        <div>
          <h2>Products</h2>
          <p>Manage your product inventory</p>
        </div>

        <span
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Add Product
        </span>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={18} />

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>product number</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => {
              const isLowStock =
                product.quantity <= product.minStock;

              return (
                <tr key={product.id}>
                  <td>
                    <div>
                      <strong>{product.name}</strong>
                      <p>{product.supplier}</p>
                    </div>
                  </td>

                  <td>{product.product_number}</td>

                  <td>{product.category}</td>

                  <td
                    className={
                      isLowStock ? "low-stock-text" : ""
                    }
                  >
                    {product.quantity}
                  </td>

                  <td>GMD {product.price}</td>

                  <td>
                    {isLowStock ? (
                      <span className="low-stock">
                        <AlertCircle size={14} />
                        Low Stock
                      </span>
                    ) : (
                      <span className="in-stock">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit size={18} className="text-gray-800" />
                      </button>

                      <button
                        className="icon-btn delete"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>
              {editingProduct
                ? "Edit Product"
                : "Add Product"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Product Number"
                  required
                  value={formData.product_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      product_number: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Supplier"
                  required
                  value={formData.supplier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supplier: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  required
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Minimum Stock"
                  required
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minStock: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

