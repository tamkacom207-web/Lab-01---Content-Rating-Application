import React from "react";
import { Link } from "react-router-dom";
import QuantityControl from "./QuantityControl.jsx";
import formatPrice from "../utils/formatPrice.js";

function ProductCard({ product, onQuantityChange, onAddToCart }) {
  const lowStock = product.quantity < 5;
  const subtotal = product.price * product.quantity;

  return (
    <article className="product-card">
      <Link
        className="product-image-link"
        to={`/products/${product.id}`}
        aria-label={`View ${product.name} details`}
      >
        <div className="product-image-wrap">
          <img className="product-image" src={product.image} alt={product.name} />
          {lowStock && <span className="stock-tag">LOW STOCK</span>}
        </div>
      </Link>
      <div className="product-card-content">
        <div className="product-heading">
          <div>
            <span className="product-category">{product.category}</span>
            <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
          </div>
          <span className="product-rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)}</span>
        </div>
        <div className="product-price-row">
          <strong>{formatPrice(product.price)} <small>/ item</small></strong>
          <span className={`stock-copy${lowStock ? " is-low" : ""}`}>
            {product.quantity === 0 ? "Out of stock" : `${product.quantity} in stock`}
          </span>
        </div>
        <div className="card-divider" />
        <div className="card-bottom">
          <QuantityControl
            name={product.name}
            quantity={product.quantity}
            onDecrease={() => onQuantityChange(product.id, -1)}
            onIncrease={() => onQuantityChange(product.id, 1)}
          />
          <div className="subtotal">
            <span>SUBTOTAL</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
        </div>
        <button
          className="add-cart-button"
          type="button"
          disabled={product.quantity === 0}
          onClick={() => onAddToCart(product)}
        >
          {product.quantity === 0 ? "Out of stock" : "Add to cart"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
