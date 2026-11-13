import React, { useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

const initialProducts = [
  {
    id: "p-001",
    name: "Everyday Ceramic Mug",
    category: "Home",
    description:
      "A thoughtfully shaped ceramic mug for slow mornings and long conversations. Its comfortable handle and generous capacity make it an everyday favorite.",
    specifications: "Stoneware · 350 ml · Dishwasher safe",
    rating: 4.8,
    price: 425,
    quantity: 12,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "p-002",
    name: "Studio Wireless Headphones",
    category: "Electronics",
    description:
      "Comfortable over-ear headphones with warm, balanced sound. Designed for focused listening at your desk or on your daily commute.",
    specifications: "Bluetooth 5.2 · 30-hour battery · USB-C charging",
    rating: 4.6,
    price: 2890,
    quantity: 4,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "p-003",
    name: "Canvas Market Tote",
    category: "Accessories",
    description:
      "A roomy, reusable tote made for market runs, library trips, and everything in between. Folds flat when you are ready to put it away.",
    specifications: "Recycled cotton canvas · 38 × 42 cm · 12 L capacity",
    rating: 4.9,
    price: 690,
    quantity: 7,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85",
  },
];

const currency = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

function formatPrice(amount) {
  return currency.format(amount);
}

function getSubtotal(product) {
  return product.price * product.quantity;
}

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");
  const total = useMemo(
    () => products.reduce((sum, product) => sum + getSubtotal(product), 0),
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
          <span className="brand-mark" aria-hidden="true">
            g
          </span>
          <span>goods<span className="brand-period">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>
            Products
          </NavLink>
          <NavLink to="/products/new">Add a product</NavLink>
        </nav>
        <div className="cart-indicator" aria-label={`${cartCount} items in cart`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </div>
      </header>

      <main>
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

function CatalogPage({ products, total, onQuantityChange, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> YOUR LITTLE STORE, IN ORDER</span>
          <h1>Good things,<br /><em>well managed.</em></h1>
          <p>Keep your favorite finds in one place. Browse your collection, keep an eye on stock, and see what it all adds up to.</p>
          <Link className="button button-dark hero-button" to="/products/new">
            Add a new product <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="hero-art" aria-label="A curated collection of everyday products">
          <img
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85"
            alt="A warm, sunlit collection of home goods"
          />
          <div className="hero-caption">
            <span className="caption-star" aria-hidden="true">✳</span>
            <span>MADE FOR THE EVERYDAY</span>
          </div>
        </div>
        <div className="hero-index"><span>01</span> / 03</div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE COLLECTION</span>
            <h2 id="catalog-heading">All the good stuff<span className="brand-period">.</span></h2>
          </div>
          <span className="product-count">{products.length.toString().padStart(2, "0")} PRODUCTS</span>
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

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
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

function ProductCard({ product, index, onQuantityChange, onAddToCart }) {
  const lowStock = product.quantity < 5;

  return (
    <article className="product-card">
      <Link
        className="product-image-link"
        to={`/products/${product.id}`}
        aria-label={`View details for ${product.name}`}
      >
        <div className="product-image-wrap">
          <img className="product-image" src={product.image} alt={product.name} />
          <span className="image-index">{String(index + 1).padStart(2, "0")}</span>
          {lowStock && <span className="stock-tag">LOW STOCK</span>}
        </div>
      </Link>
      <div className="product-card-content">
        <div className="product-heading">
          <div>
            <span className="product-category">{product.category}</span>
            <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
          </div>
          <span className="product-rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)}</span>
        </div>
        <div className="product-price-row">
          <span className="unit-price">{formatPrice(product.price)} <small>/ item</small></span>
          <span className="stock-copy">{product.quantity} in stock</span>
        </div>
        <div className="card-divider" />
        <div className="card-bottom">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button
              type="button"
              aria-label={`Remove one ${product.name}`}
              disabled={product.quantity === 0}
              onClick={() => onQuantityChange(product.id, -1)}
            >
              −
            </button>
            <span>{product.quantity}</span>
            <button
              type="button"
              aria-label={`Add one ${product.name}`}
              onClick={() => onQuantityChange(product.id, 1)}
            >
              +
            </button>
          </div>
          <div className="subtotal">
            <span>SUBTOTAL</span>
            <strong>{formatPrice(getSubtotal(product))}</strong>
          </div>
        </div>
        <button
          type="button"
          className="add-cart-button"
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
          <span className="detail-image-note">A GOOD THING, IN DETAIL</span>
        </div>
        <section className="detail-content">
          <span className="eyebrow">{product.category.toUpperCase()} · PRODUCT DETAILS</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)} <span className="rating-note">A customer favorite</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="specification-box">
            <span className="eyebrow">THE DETAILS</span>
            <p>{product.specifications}</p>
          </div>
          <div className="detail-price">{formatPrice(product.price)} <span> / item</span></div>
          <div className={`detail-stock${lowStock ? " is-low" : ""}`}>
            <span className="stock-indicator" />
            {product.quantity === 0
              ? "Currently out of stock"
              : lowStock
                ? `Only ${product.quantity} left — low stock`
                : `${product.quantity} in stock`}
          </div>
          <div className="detail-actions">
            <div className="quantity-control quantity-control-large" aria-label={`Quantity for ${product.name}`}>
              <button
                type="button"
                aria-label={`Remove one ${product.name}`}
                disabled={product.quantity === 0}
                onClick={() => onQuantityChange(product.id, -1)}
              >
                −
              </button>
              <span>{product.quantity}</span>
              <button
                type="button"
                aria-label={`Add one ${product.name}`}
                onClick={() => onQuantityChange(product.id, 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="button button-dark detail-cart-button"
              disabled={product.quantity === 0}
              onClick={() => onAddToCart(product)}
            >
              {product.quantity === 0 ? "Out of stock" : "Add to cart"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="detail-subtotal">
            <span>YOUR SUBTOTAL</span>
            <strong>{formatPrice(getSubtotal(product))}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

function AddProductPage({ onAddProduct }) {
  const navigate = useNavigate();
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

    if (price <= 0 || quantity < 0 || !Number.isInteger(quantity) || rating < 1 || rating > 5) {
      setFormError("Enter a price above zero, a whole-number quantity, and a rating from 1 to 5.");
      return;
    }

    const product = {
      id: `p-${Date.now()}`,
      name,
      category,
      image,
      description,
      specifications,
      rating,
      price,
      quantity,
    };

    onAddProduct(product);
    navigate(`/products/${product.id}`);
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

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-section-label"><span>01</span> THE ESSENTIALS</div>
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
            <textarea name="description" rows="3" placeholder="What makes this one special?" required />
          </label>
          <label className="form-field form-field-wide">
            <span>Product specifications <b>*</b></span>
            <textarea name="specifications" rows="2" placeholder="Materials, dimensions, features..." required />
          </label>
        </div>

        <div className="form-section-label form-section-spaced"><span>02</span> THE NUMBERS</div>
        <div className="form-grid form-numbers-grid">
          <label className="form-field">
            <span>Rating <b>*</b></span>
            <input name="rating" type="number" min="1" max="5" step="0.1" placeholder="4.8" required />
            <small>Choose a number from 1 to 5</small>
          </label>
          <label className="form-field">
            <span>Price (₱) <b>*</b></span>
            <input name="price" type="number" min="0.01" step="0.01" placeholder="0.00" required />
          </label>
          <label className="form-field">
            <span>Quantity <b>*</b></span>
            <input name="quantity" type="number" min="0" step="1" placeholder="0" required />
            <small>Quantities under 5 are marked low stock</small>
          </label>
        </div>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <div className="form-submit-row">
          <p>Fields marked <b>*</b> are required.</p>
          <button className="button button-dark" type="submit">Add to collection <span aria-hidden="true">↗</span></button>
        </div>
      </form>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page-container not-found">
      <span className="eyebrow">A LITTLE DETOUR</span>
      <h1>We couldn't<br /><em>find that one.</em></h1>
      <Link className="button button-dark" to="/">Back to the collection <span aria-hidden="true">↗</span></Link>
    </div>
  );
}

export default App;
