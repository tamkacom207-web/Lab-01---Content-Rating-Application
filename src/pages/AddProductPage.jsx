import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";

function AddProductPage({ onAddProduct }) {
  const navigate = useNavigate();

  function handleSuccess(productId) {
    navigate(`/products/${productId}`);
  }

  return (
    <div className="page-container form-page">
      <Link className="back-link" to="/"><span aria-hidden="true">←</span> Back to all products</Link>
      <div className="form-page-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> MAKE ROOM FOR SOMETHING NEW</span>
          <h1>Add a new<br /><em>good thing.</em></h1>
        </div>
        <p>Tell us a little about it. Every detail helps keep your collection looking its best.</p>
      </div>
      <ProductForm onSubmit={onAddProduct} onSuccess={handleSuccess} />
    </div>
  );
}

export default AddProductPage;
