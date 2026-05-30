import React from "react";

function AddProduct({
  editingProduct,
  formData,
  handleChange,
  handleSubmit,
  resetForm,
  categories,
}) {

  return (
    <div className="modal-overlay">

      <div className="modal">

        {/* HEADER */}

        <div className="modal-header">

          <h3>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h3>

          <button onClick={resetForm}>
            ×
          </button>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* PRODUCT NAME */}

            <div className="input-group">

              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

            </div>

            {/* PRODUCT NUMBER */}

            <div className="input-group">

              <label>Product Number</label>

              <input
                type="text"
                name="product_number"
                value={formData.product_number}
                onChange={handleChange}
                placeholder="PRD001"
                required
              />

            </div>

            {/* CATEGORY */}

            <div className="input-group">

              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((cat, index) => (
                  <option
                    key={index}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}

              </select>

            </div>

            {/* SUPPLIER */}

            <div className="input-group">

              <label>Supplier</label>

              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Supplier name"
                required
              />

            </div>

            {/* QUANTITY */}

            <div className="input-group">

              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                required
              />

            </div>

            {/* STATUS */}

            <div className="input-group">

              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Status
                </option>

                <option value="In Stock">
                  In Stock
                </option>

                <option value="Low Stock">
                  Low Stock
                </option>

                <option value="Out of Stock">
                  Out of Stock
                </option>

              </select>

            </div>

            {/* PRICE */}

            <div className="input-group full-width">

              <label>Price (GMD)</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddProduct;