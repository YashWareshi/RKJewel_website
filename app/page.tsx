"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";

const CHAIN_IMAGE =
  "https://images.pexels.com/photos/7383116/pexels-photo-7383116.jpeg?auto=compress&cs=tinysrgb&w=1200";
const BRIDE_IMAGE =
  "https://images.pexels.com/photos/10347064/pexels-photo-10347064.jpeg?auto=compress&cs=tinysrgb&w=1200";

const NECK_IND =
  "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?auto=format&fit=crop&w=1200&q=80";
const RING_SOL =
  "https://images.unsplash.com/photo-1763256614634-7feb3ff79ff3?auto=format&fit=crop&w=1200&q=80";
const BANG_TEMP =
  "https://images.pexels.com/photos/37485314/pexels-photo-37485314.jpeg?auto=compress&cs=tinysrgb&w=1200";
const EARR_GOLD =
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80";
const NECK_CHOK =
  "https://images.unsplash.com/photo-1767391255584-763f98ced9d0?auto=format&fit=crop&w=1200&q=80";
const BANG_TENNIS =
  "https://images.pexels.com/photos/38827892/pexels-photo-38827892.jpeg?auto=compress&cs=tinysrgb&w=1200";
const NECK_VINT =
  "https://images.unsplash.com/photo-1667013829910-0c08b562abd6?auto=format&fit=crop&w=1200&q=80";
const MANGA_URL =
  "https://images.pexels.com/photos/13292955/pexels-photo-13292955.jpeg?auto=compress&cs=tinysrgb&w=1200";

const CAT_NECK =
  "https://images.pexels.com/photos/25283496/pexels-photo-25283496.jpeg?auto=compress&cs=tinysrgb&w=600";
const CAT_EARR =
  "https://images.unsplash.com/photo-1735480165343-96034e9528f9?auto=format&fit=crop&w=600&q=80";
const CAT_RING =
  "https://images.unsplash.com/photo-1481980235850-66e47651e431?auto=format&fit=crop&w=600&q=80";
const CAT_BANG =
  "https://images.pexels.com/photos/37485309/pexels-photo-37485309.jpeg?auto=compress&cs=tinysrgb&w=600";
const CAT_PEND =
  "https://images.pexels.com/photos/4595723/pexels-photo-4595723.jpeg?auto=compress&cs=tinysrgb&w=600";
const CAT_MANGA =
  "https://images.pexels.com/photos/28985983/pexels-photo-28985983.jpeg?auto=compress&cs=tinysrgb&w=600";

const categories: { name: string; image: string }[] = [
  { name: "Necklaces", image: CAT_NECK },
  { name: "Earrings", image: CAT_EARR },
  { name: "Rings", image: CAT_RING },
  { name: "Bangles", image: CAT_BANG },
  { name: "Pendants", image: CAT_PEND },
  { name: "Mangalsutra", image: CAT_MANGA },
];

const products = [
  {
    name: "Kundan Bridal Set",
    category: "22K Gold",
    price: "1,28,500",
    priceRaw: 128500,
    oldPrice: "1,42,000",
    image: NECK_IND,
    tag: "Bestseller",
    description: "Majestic kundan bridal set with intricate meenakari work and polki diamonds for the modern Indian bride.",
  },
  {
    name: "Solitaire Diamond Ring",
    category: "18K Diamond",
    price: "86,900",
    priceRaw: 86900,
    oldPrice: "",
    image: RING_SOL,
    tag: "New",
    description: "Brilliant solitaire with VS1 clarity diamonds set in 18K gold. Timeless and forever cherished.",
  },
  {
    name: "Temple Gold Bangles",
    category: "22K Gold",
    price: "72,400",
    priceRaw: 72400,
    oldPrice: "79,000",
    image: BANG_TEMP,
    tag: "5% Off",
    description: "Heritage gold bangles with hand-etched temple motifs and a rich high-polish finish.",
  },
  {
    name: "Gold Drop Earrings",
    category: "22K Gold",
    price: "34,800",
    priceRaw: 34800,
    oldPrice: "",
    image: EARR_GOLD,
    tag: "New",
    description: "Graceful drop earrings with lustrous pearls on delicate 22K gold chains.",
  },
  {
    name: "Polki Choker Necklace",
    category: "22K Gold",
    price: "1,95,000",
    priceRaw: 195000,
    oldPrice: "2,10,000",
    image: NECK_CHOK,
    tag: "Premium",
    description: "Regal polki choker with uncut diamonds and emerald accents, including matching earrings.",
  },
  {
    name: "Gold Tennis Bracelet",
    category: "18K Gold",
    price: "1,45,000",
    priceRaw: 145000,
    oldPrice: "",
    image: BANG_TENNIS,
    tag: "New",
    description: "Classic tennis bracelet with 3.5 carats of round brilliant gold accents in 18K gold.",
  },
  {
    name: "Vintage Gold Necklace",
    category: "22K Gold",
    price: "58,200",
    priceRaw: 58200,
    oldPrice: "62,000",
    image: NECK_VINT,
    tag: "Bestseller",
    description: "Traditional vintage-inspired necklace with intricate motifs, handcrafted with inherited techniques.",
  },
  {
    name: "Nauvari Mangalsutra",
    category: "22K Gold",
    price: "92,600",
    priceRaw: 92600,
    oldPrice: "",
    image: MANGA_URL,
    tag: "Limited",
    description: "Traditional two-strand mangalsutra with black beads and an ornate gold pendant for the Maharashtrian bride.",
  },
];

const reviews = [
  {
    text: "The bridal set was breathtaking. Every detail was crafted to perfection and made my wedding day truly magical.",
    name: "Priya Shah",
    location: "Mumbai",
  },
  {
    text: "From the first visit to the final purchase, everything felt premium. The gold purity and finishing are outstanding.",
    name: "Riya Mehta",
    location: "Thane",
  },
  {
    text: "I bought the mangalsutra for my wife and she was in tears. Thank you for making it so special.",
    name: "Neha Patel",
    location: "Mira Road",
  },
];

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[number] | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const toggleWishlist = (index: number) => {
    setWishlist((c) => (c.includes(index) ? c.filter((i) => i !== index) : [...c, index]));
  };

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex((c) => c.name === item.name);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], quantity: copy[existing].quantity + item.quantity };
        return copy;
      }
      return [...prev, item];
    });
    setAddedToast(item.name);
    setTimeout(() => setAddedToast(null), 2500);
  }, []);

  const removeFromCart = (index: number) => setCart((prev) => prev.filter((_, i) => i !== index));

  const updateQty = (index: number, qty: number) => {
    if (qty < 1) return;
    setCart((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], quantity: qty };
      return copy;
    });
  };

  const sendWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart.map(
      (item, i) => `${i + 1}. ${item.name} (${item.category}) - ₹${item.priceRaw.toLocaleString("en-IN")} x ${item.quantity}`
    );
    const total = cart.reduce((s, i) => s + i.priceRaw * i.quantity, 0);
    const msg = `Hi! I'd like to enquire about the following items:\n\n${lines.join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}\n\nPlease share more details.`;
    window.open(`https://wa.me/919967939693?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {addedToast && (
        <div className="toast">
          <span>✓</span> <strong>{addedToast}</strong> added to cart
        </div>
      )}

      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content" data-reveal>
          <p className="eyebrow">RADHA KRISHNA JEWELS · EST. 1975</p>
          <h1>
            Gold That
            <br />
            <em>Lasts Generations.</em>
          </h1>
          <p className="hero-text">
            Pure 22K Maharashtrian gold, handcrafted with timeless artistry —
            from daily-wear sakha and mangalsutra to once-in-a-lifetime bridal
            heirlooms.
          </p>
          <div className="hero-buttons">
            <a href="#new" className="btn btn-gold">Shop Gold Designs</a>
            <a
              href="https://wa.me/919967939693?text=Hi!%20I%27d%20like%20a%20free%20gold%20consultation."
              className="btn btn-outline-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Consultation
            </a>
          </div>
          <div className="hero-trust">
            <span>BIS 916 Hallmarked</span>
            <span className="hero-trust-sep">|</span>
            <span>Certified Diamonds</span>
            <span className="hero-trust-sep">|</span>
            <span>Lifetime Exchange</span>
          </div>
        </div>
        <div className="hero-model" data-reveal>
          <img src={CHAIN_IMAGE} alt="Gold chain necklace worn elegantly" loading="eager" />
          <div className="hero-badge">
            <span className="hero-badge-mark">✦</span>
            <div>
              <strong>22K Pure Gold</strong>
              <small>BIS 916 Hallmarked</small>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-row" data-reveal>
        <div className="trust-item">
          <span>✦</span>
          <div><strong>Certified Purity</strong><p>BIS 916 Hallmarked</p></div>
        </div>
        <div className="trust-item">
          <span>◇</span>
          <div><strong>Lifetime Exchange</strong><p>Easy buyback & returns</p></div>
        </div>
        <div className="trust-item">
          <span>♡</span>
          <div><strong>Free Delivery</strong><p>Insured shipping 25K+</p></div>
        </div>
        <div className="trust-item">
          <span>∞</span>
          <div><strong>Lifetime Care</strong><p>Free polish & cleaning</p></div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" id="collections">
        <div className="section-head center" data-reveal>
          <p className="eyebrow">SHOP BY CATEGORY</p>
          <h2>Explore Gold Designs</h2>
        </div>
        <div className="cat-grid">
          {categories.map((cat, i) => (
            <a href="#new" className="cat-card" key={cat.name} data-reveal>
              <div className="cat-img">
                <img src={cat.image} alt={`${cat.name} in gold`} loading="lazy" />
              </div>
              <h3>{cat.name}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section soft" id="new">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>Trending Gold</h2>
          </div>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              index={index}
              isWishlisted={wishlist.includes(index)}
              onToggleWishlist={toggleWishlist}
              onQuickView={setQuickViewProduct}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* BRIDAL */}
      <section className="bridal" id="bridal">
        <div className="bridal-img">
          <img src={BRIDE_IMAGE} alt="Bride in traditional gold jewellery" loading="lazy" />
        </div>
        <div className="bridal-body" data-reveal>
          <p className="eyebrow light">THE BRIDAL EDIT</p>
          <h2>For the day you&apos;ve <em>dreamed of.</em></h2>
          <p>
            From heirloom thushi and haar to delicate diamond accents — discover
            pieces designed to make your most beautiful day unforgettable.
          </p>
          <div className="bridal-stats">
            <div><strong>200+</strong><span>Bridal Designs</span></div>
            <div><strong>100%</strong><span>Hallmarked</span></div>
            <div><strong>50+</strong><span>Years of Craft</span></div>
          </div>
          <a
            href={`https://wa.me/919967939693?text=${encodeURIComponent("Hi! I'd like to explore the Bridal Collection. Please share details.")}`}
            className="btn btn-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            📞 Enquire via WhatsApp
          </a>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" id="about">
        <div className="section-head center" data-reveal>
          <p className="eyebrow">WHY CHOOSE US</p>
          <h2>Crafted with trust</h2>
        </div>
        <div className="promise-grid">
          {[
            { icon: "✦", title: "Certified Quality", desc: "BIS 916 hallmark on every piece, verified for purity before delivery." },
            { icon: "◇", title: "Heritage Craft", desc: "Techniques passed down for three generations of master artisans." },
            { icon: "♡", title: "Personal Styling", desc: "Dedicated consultants to help find the perfect piece for you." },
            { icon: "∞", title: "Lifetime Promise", desc: "Complimentary cleaning, polishing and lifetime maintenance." },
          ].map((p, i) => (
            <div className="promise-card" key={p.title} data-reveal>
              <span>{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="reviews">
        <div className="section-head center" data-reveal>
          <p className="eyebrow">CUSTOMER STORIES</p>
          <h2>Loved by many</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <article className="review-card" key={r.name} data-reveal>
              <div className="stars">★★★★★</div>
              <p>&ldquo;{r.text}&rdquo;</p>
              <div className="reviewer">
                <div className="review-avatar">{r.name.charAt(0)}</div>
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* VISIT US */}
      <section className="visit" data-reveal>
        <div className="visit-card">
          <p className="eyebrow">VISIT OUR BOUTIQUE</p>
          <h2>Malad, Mumbai</h2>
          <p>Radha Krishna Enterprises · Maharashtra, India</p>
          <p className="visit-phone">+91 99679 39693</p>
          <div className="visit-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Radha+Krishna+Jewellers+Mira+Road+Mumbai"
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >Get Directions</a>
            <a
              href="https://wa.me/919967939693?text=Hi!%20I%27d%20like%20to%20book%20a%20gold%20consultation."
              className="btn btn-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              📞 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter" data-reveal>
        <div>
          <p className="eyebrow">STAY IN THE KNOW</p>
          <h2>Get gold rate alerts &amp; offers.</h2>
        </div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <span className="footer-logo-mark">✦</span>
              <span>
                <strong>RADHAKRISHNA</strong>
                <small>JEWELS</small>
              </span>
            </a>
            <p>Timeless Maharashtrian gold, thoughtfully crafted for life&apos;s most beautiful moments.</p>
            <div className="footer-socials">
              <a href="#">IG</a>
              <a href="#">FB</a>
              <a href={`https://wa.me/919967939693`} target="_blank" rel="noopener noreferrer">WA</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#">Gold Jewellery</a>
            <a href="#">Diamond Jewellery</a>
            <a href="#">Bridal Collection</a>
            <a href="#">Mangalsutra</a>
            <a href="#">Thushi & Haar</a>
          </div>
          <div className="footer-col">
            <h4>Customer Care</h4>
            <a href="#">Track Order</a>
            <a href="#">Gold Rate Today</a>
            <a href="#">Returns & Exchange</a>
            <a href="#">Hallmark Guide</a>
            <a href="#">FAQs</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Malad, Mumbai</p>
            <p>Maharashtra, India</p>
            <p>+91 99679 39693</p>
            <a href="https://wa.me/919967939693" target="_blank" rel="noopener noreferrer" className="footer-wa">📞 WhatsApp Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 RadhaKrishna Jewels. All rights reserved.</span>
          <span>Privacy · Terms · Shipping</span>
        </div>
      </footer>

      <WhatsAppButton items={cart} />
      <BackToTop />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onUpdateQty={updateQty} onSendWhatsApp={sendWhatsApp} />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={addToCart} />
    </main>
  );
}