import React, { useState } from "react";
import "../css/categories.css";
import {
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const initialCategories = [
  {
    id: 1,
    name: "Pharmaceuticals",
    description: "Medicines and pharmaceutical products",
    productCount: 3,
  },
  {
    id: 2,
    name: "Food Items",
    description: "Food and beverage products",
    productCount: 3,
  },
  {
    id: 3,
    name: "Hygiene Products",
    description: "Cleaning and personal hygiene items",
    productCount: 2,
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);

  const [showModal, setShowModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // =========================
  // OPEN ADD MODAL
  // =========================

  const openAddModal = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(true);
  };

  // =========================
  // EDIT CATEGORY
  // =========================

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
    });

    setShowModal(true);
  };

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    setCategories(categories.filter((item) => item.id !== id));
  };

  // =========================
  // SUBMIT FORM
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      setCategories(
        categories.map((item) =>
          item.id === editingCategory.id
            ? {
                ...item,
                name: formData.name,
                description: formData.description,
              }
            : item
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        productCount: 0,
      };

      setCategories([...categories, newCategory]);
    }

    setShowModal(false);

    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <div className="categories-page">

      {/* HEADER */}

      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p>Organize your products into categories</p>
        </div>

        <div className="add-btn" onClick={openAddModal}>
          <Plus size={20} />
          Add Category
        </div>
      </div>

      {/* CARDS */}

      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.id}>

            <div className="card-top">

              <div className="folder-icon">
                <FolderOpen size={28} />
              </div>

              <div>
                <h2>{category.name}</h2>

                <span>
                  {category.productCount}{" "}
                  {category.productCount === 1
                    ? "product"
                    : "products"}
                </span>
              </div>
            </div>

            <p className="description">
              {category.description}
            </p>

            <div className="card-actions">

              <button
                className="edit-btn"
                onClick={() => handleEdit(category)}
              >
                <Pencil size={18} />
                <span className="text-xl">Edit</span>
                
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 size={18} />
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Category Name</label>

                <input
                  type="text"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  rows="4"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingCategory
                    ? "Update Category"
                    : "Add Category"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;