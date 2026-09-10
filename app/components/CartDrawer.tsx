"use client";

import { useEffect } from "react";

export type CartItem = {
  name: string;
  category: string;
  price: string;
  priceRaw: number;
  imageUrl: string;
  quantity: number;
};

type Props = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onUpdateQty: (index: number, qty: number) => void;
  onSendWhatsApp: () => void;
};

export default function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onSendWhatsApp,
}: Props) {
  const total = items.reduce((sum, item) => sum + item.priceRaw * item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={`cart-overlay ${open ? "active" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">♧</span>
            <p>Your cart is empty</p>
            <span>Add beautiful jewellery to get started</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item, i) => (
                <div className="cart-item" key={i}>
                  <div className="cart-item-model">
                    <img src={item.imageUrl} alt={item.name} loading="lazy" />
                  </div>
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <strong>{item.name}</strong>
                    <span className="cart-item-price">
                      ₹{item.priceRaw.toLocaleString("en-IN")}
                    </span>
                    <div className="cart-item-qty">
                      <button
                        onClick={() => onUpdateQty(i, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQty(i, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemove(i)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <button className="btn btn-dark cart-whatsapp-btn" onClick={onSendWhatsApp}>
                <span className="wa-icon">📞</span>
                Enquire via WhatsApp
              </button>
              <p className="cart-note">Free shipping on orders above ₹25,000</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}