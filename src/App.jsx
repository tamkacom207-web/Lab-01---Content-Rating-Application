import React, { useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import AddProductPage from "./pages/AddProductPage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import QuantityControl from "./components/QuantityControl.jsx";
import initialProducts from "./data/products.js";
import formatPrice from "./utils/formatPrice.js";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  const total = useMemo(
    () => products.reduce((sum, product) => sum + product.price * product.quantity, 0),
    [products],
  );

  function changeQuantity(productId, amount) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + amount) }
          : product,
      ),
    );
  }

  function addToCart(product) {
    if (product.quantity === 0) {
      setNotice(`${product.name} is out of stock.`);
      return;
    }

    setCartCount((count) => count + 1);
    setNotice(`${product.name} added to your cart.`);
  }

  function addProduct(product) {
    setProducts((currentProducts) => [...currentProducts, product]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Goods home">
          <span className="brand-mark" aria-hidden="true">g</span>
          <span>goods<span className="brand-period">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Products</NavLink>
          <NavLink to="/products/new">Add a product</NavLink>
        </nav>
        <button
          className="cart-indicator"
          type="button"
          aria-label={`Cart, ${cartCount} items`}
          onClick={() => setNotice(`Your cart has ${cartCount} items.`)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span>Cart</span>
          <span className="cart-count" aria-hidden="true">{cartCount}</span>
        </button>
      </header>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <CatalogPage
                products={products}
                total={total}
                onQuantityChange={changeQuantity}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/new"
            element={<AddProductPage onAddProduct={addProduct} />}
          />
          <Route
            path="/products/:productId"
            element={
              <ProductDetailPage
                products={products}
                onQuantityChange={changeQuantity}
                onAddToCart={addToCart}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <Link className="footer-brand" to="/">goods.</Link>
        <span>Thoughtful things, simply managed.</span>
        <span>© 2025 Goods</span>
      </footer>
      <div className="sr-only" aria-live="polite">{notice}</div>
    </div>
  );
}

function ProductDetailPage({ products, onQuantityChange, onAddToCart }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <NotFoundPage />;
  }

  const lowStock = product.quantity < 5;

  return (
    <div className="page-container detail-page">
      <Link className="back-link" to="/"><span aria-hidden="true">←</span> Back to all products</Link>
      <div className="detail-layout">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <section className="detail-content" aria-labelledby="detail-title">
          <span className="eyebrow">{product.category.toUpperCase()} · PRODUCT DETAILS</span>
          <h1 id="detail-title">{product.name}</h1>
          <div className="detail-rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)} / 5</div>
          <p className="detail-description">{product.description}</p>
          <div className="specification-box">
            <span className="eyebrow">PRODUCT SPECIFICATIONS</span>
            <p>{product.specifications}</p>
          </div>
          <div className="detail-price">{formatPrice(product.price)} <span>/ item</span></div>
          <div className={`detail-stock${lowStock ? " is-low" : ""}`}>
            <span className="stock-indicator" />
            {product.quantity === 0
              ? "Out of stock"
              : lowStock
                ? `Low stock · only ${product.quantity} left`
                : `${product.quantity} in stock`}
          </div>
          <div className="detail-actions">
            <QuantityControl
              name={product.name}
              quantity={product.quantity}
              onDecrease={() => onQuantityChange(product.id, -1)}
              onIncrease={() => onQuantityChange(product.id, 1)}
              large
            />
            <button
              className="button button-dark detail-cart-button"
              type="button"
              disabled={product.quantity === 0}
              onClick={() => onAddToCart(product)}
            >
              {product.quantity === 0 ? "Out of stock" : "Add to cart"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="detail-subtotal">
            <span>SUBTOTAL ({product.quantity} items)</span>
            <strong>{formatPrice(product.price * product.quantity)}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="eyebrow">PRODUCT NOT FOUND</span>
      <h1>That item isn&apos;t in the collection.</h1>
      <Link className="button button-dark" to="/">Back to products</Link>
    </div>
  );
}

export default App;
