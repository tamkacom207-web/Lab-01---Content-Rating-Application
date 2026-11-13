import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import formatPrice from "../utils/formatPrice.js";

function CatalogPage({ products, total, onQuantityChange, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> YOUR LITTLE STORE, IN ORDER</span>
          <h1>Good things,<br /><em>well managed.</em></h1>
          <p>
            Keep your favorite finds in one place. Browse your collection,
            keep an eye on stock, and see what it all adds up to.
          </p>
          <Link className="button button-dark hero-button" to="/products/new">
            Add a new product <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-art" aria-label="A curated collection of everyday products">
          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85"
            alt="A warm, sunlit collection of home goods"
          />
          <span className="hero-caption"><span aria-hidden="true">✳</span> MADE FOR THE EVERYDAY</span>
        </div>
      </section>

      <section className="catalog-section" id="catalog" aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE COLLECTION</span>
            <h2 id="catalog-heading">All the good stuff<span className="brand-period">.</span></h2>
          </div>
          <span className="product-count">{String(products.length).padStart(2, "0")} PRODUCTS</span>
        </div>
        <div className="catalog-toolbar">
          <div className="category-filters" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                className={`filter-chip${activeCategory === category ? " is-active" : ""}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="sort-note">A LITTLE BIT OF EVERYTHING</span>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuantityChange={onQuantityChange}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <p>No products in this category just yet.</p>
            <Link to="/products/new">Add the first one</Link>
          </div>
        )}

        <div className="total-bar">
          <div className="total-label">
            <span className="total-icon" aria-hidden="true">↗</span>
            <div>
              <span className="eyebrow">YOUR COLLECTION VALUE</span>
              <span className="total-caption">Based on all products and quantities</span>
            </div>
          </div>
          <strong>{formatPrice(total)}</strong>
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;
