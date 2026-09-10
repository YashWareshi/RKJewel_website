"use client";

import { useEffect } from "react";
import { CartItem } from "./CartDrawer";

type Product = {
  name: string;
  category: string;
  price: string;
  priceRaw: number;
  oldPrice: string;
  image: string;
  tag: string;
  description: string;
};

type Props = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
};

export default function QuickViewModal({ product, onClose, onAddToCart }: Props) {
  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className={`qv-overlay ${product ? "active" : ""}`} onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="qv-body">
          <div className="qv-image">
            <img src={product.image} alt={product.name} className="qv-photo" />
            {product.tag && <span className="product-tag">{product.tag}</span>}
          </div>

          <div className="qv-info">
            <span className="qv-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="qv-desc">
              {product.description ||
                "Exquisitely handcrafted with meticulous attention to detail. Each piece tells a story of heritage artistry and modern elegance."}
            </p>

            <div className="qv-price">
              <strong>{product.price}</strong>
              {product.oldPrice && <del>{product.oldPrice}</del>}
            </div>

            <div className="qv-details">
              <div>
                <span className="qv-detail-label">Material</span>
                <span>{product.category}</span>
              </div>
              <div>
                <span className="qv-detail-label">Purity</span>
                <span>Hallmarked</span>
              </div>
              <div>
                <span className="qv-detail-label">Certification</span>
                <span>BIS Certified</span>
              </div>
            </div>

            <div className="qv-actions">
              <button
                className="btn btn-dark"
                onClick={() => {
                  onAddToCart({
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    priceRaw: product.priceRaw,
                    imageUrl: product.image,
                    quantity: 1,
                  });
                  onClose();
                }}
              >
                Add to Cart
              </button>
              <a
                className="btn btn-whatsapp"
                href={`https://wa.me/919967939693?text=${encodeURIComponent(
                  `Hi! I'm interested in:\n\n${product.name} (${product.category})\nPrice: ${product.price}\n\nPlease share more details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📞 Enquire Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}