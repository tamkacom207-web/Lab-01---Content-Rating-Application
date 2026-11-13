import React, { useState } from "react";

function ProductForm({ onSubmit, onSuccess }) {
  const [formError, setFormError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const category = formData.get("category").trim();
    const image = formData.get("image").trim();
    const description = formData.get("description").trim();
    const specifications = formData.get("specifications").trim();
    const rating = Number(formData.get("rating"));
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));

    if (
      !name ||
      !category ||
      !image ||
      !description ||
      !specifications ||
      !Number.isFinite(rating) ||
      !Number.isFinite(price) ||
      !Number.isFinite(quantity)
    ) {
      setFormError("Please complete every field before adding your product.");
      return;
    }

    if (
      rating < 1 ||
      rating > 5 ||
      price <= 0 ||
      quantity < 0 ||
      !Number.isInteger(quantity)
    ) {
      setFormError("Enter a rating from 1 to 5, a price above zero, and a whole-number quantity.");
      return;
    }

    const product = {
      id: `product-${Date.now()}`,
      name,
      category,
      image,
      description,
      specifications,
      rating,
      price,
      quantity,
    };

    onSubmit(product);
    onSuccess(product.id);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-section-label"><span>01</span> PRODUCT DETAILS</div>
      <div className="form-grid">
        <label className="form-field form-field-wide">
          <span>Product name <b>*</b></span>
          <input name="name" type="text" placeholder="e.g. Sunday Morning Vase" required />
        </label>
        <label className="form-field">
          <span>Category <b>*</b></span>
          <input
            name="category"
            type="text"
            list="product-categories"
            placeholder="Choose or enter a category"
            required
          />
          <datalist id="product-categories">
            <option value="Home" />
            <option value="Electronics" />
            <option value="Accessories" />
            <option value="Personal Care" />
          </datalist>
        </label>
        <label className="form-field">
          <span>Feature image URL <b>*</b></span>
          <input name="image" type="url" placeholder="https://..." required />
        </label>
        <label className="form-field form-field-wide">
          <span>Description <b>*</b></span>
          <textarea name="description" rows="3" placeholder="What makes this product special?" required />
        </label>
        <label className="form-field form-field-wide">
          <span>Product specifications <b>*</b></span>
          <textarea name="specifications" rows="2" placeholder="Materials, dimensions, features..." required />
        </label>
      </div>

      <div className="form-section-label form-section-spaced"><span>02</span> INVENTORY &amp; PRICE</div>
      <div className="form-grid form-numbers-grid">
        <label className="form-field">
          <span>Rating <b>*</b></span>
          <input name="rating" type="number" min="1" max="5" step="0.1" placeholder="4.8" required />
          <small>From 1 to 5</small>
        </label>
        <label className="form-field">
          <span>Price (₱) <b>*</b></span>
          <input name="price" type="number" min="0.01" step="0.01" placeholder="0.00" required />
        </label>
        <label className="form-field">
          <span>Quantity <b>*</b></span>
          <input name="quantity" type="number" min="0" step="1" placeholder="0" required />
          <small>Below 5 is marked low stock</small>
        </label>
      </div>
      {formError && <p className="form-error" role="alert">{formError}</p>}
      <div className="form-submit-row">
        <p>Fields marked <b>*</b> are required.</p>
        <button className="button button-dark" type="submit">
          Add to collection <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
