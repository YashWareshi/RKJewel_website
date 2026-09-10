"use client";

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
  product: Product;
  index: number;
  isWishlisted: boolean;
  onToggleWishlist: (index: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
};

export default function ProductCard({
  product,
  index,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: Props) {
  return (
    <article className="product-card" data-reveal>
      <div className="product-image">
        <div className="product-model-stage">
          <img src={product.image} alt={product.name} className="product-photo" loading="lazy" />
        </div>
        <span className="product-tag">{product.tag}</span>

        <button
          className={`wishlist ${isWishlisted ? "active" : ""}`}
          onClick={() => onToggleWishlist(index)}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <div className="product-overlay-actions">
          <button className="quick-view-btn" onClick={() => onQuickView(product)}>
            Quick View
          </button>
          <button
            className="add-cart-btn"
            onClick={() =>
              onAddToCart({
                name: product.name,
                category: product.category,
                price: product.price,
                priceRaw: product.priceRaw,
                imageUrl: product.image,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
        <div className="product-price">
          <strong>{product.price}</strong>
          {product.oldPrice && <del>{product.oldPrice}</del>}
        </div>
      </div>
    </article>
  );
}