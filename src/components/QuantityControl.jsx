import React from "react";

function QuantityControl({ name, quantity, onDecrease, onIncrease, large = false }) {
  return (
    <div
      className={`quantity-control${large ? " quantity-control-large" : ""}`}
      aria-label={`Quantity for ${name}`}
    >
      <button
        type="button"
        aria-label={`Remove one ${name}`}
        disabled={quantity === 0}
        onClick={onDecrease}
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        aria-label={`Add one ${name}`}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
