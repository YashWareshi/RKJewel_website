"use client";

import { useState } from "react";
import { CartItem } from "./CartDrawer";

type Props = {
  cartCount: number;
  onCartOpen: () => void;
};

export default function Navbar({ cartCount, onCartOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="top-bar">
        <p>Complimentary shipping on orders above ₹25,000</p>
        <div>
          <span>22K GOLD</span>
          <span>DIAMONDS</span>
          <span>CRAFTED IN INDIA</span>
        </div>
      </div>

      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-mark">✦</span>
          <span>
            <strong>Radha Krishna Enterprises</strong>
            <small>JEWELS</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#new" onClick={() => setMenuOpen(false)}>New Arrivals</a>
          <a href="#bridal" onClick={() => setMenuOpen(false)}>Bridal</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="cart-btn" aria-label="Cart" onClick={onCartOpen}>
            ♧
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>

        <div className="nav-mobile-right">
          <button className="cart-btn" aria-label="Cart" onClick={onCartOpen}>
            ♧
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
    </>
  );
}
