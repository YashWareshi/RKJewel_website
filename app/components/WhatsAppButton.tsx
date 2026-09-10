"use client";

import { CartItem } from "./CartDrawer";

type Props = {
  items: CartItem[];
};

export default function WhatsAppButton({ items }: Props) {
  const message =
    items.length > 0
? `Hi! I'd like to enquire about the following items:\n\n${items
          .map(
            (item, i) =>
              `${i + 1}. ${item.name} (${item.category}) - ₹${item.priceRaw.toLocaleString("en-IN")} x ${item.quantity}`
          )
          .join("\n")}\n\nTotal: ₹${items
          .reduce((s, i) => s + i.priceRaw * i.quantity, 0)
          .toLocaleString("en-IN")}\n\nPlease share more details.`
      : "Hi! I'd like to know more about your jewellery collection.";

  return (
    <a
      className="wa-float"
      href={`https://wa.me/919967939693?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="white" width="26" height="26">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.378L1.054 31.2l6.062-1.96A15.912 15.912 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.318 22.594c-.39 1.1-1.932 2.014-3.166 2.27-.842.174-1.94.314-5.644-1.21-4.742-1.948-7.792-6.72-8.028-7.036-.228-.316-1.886-2.508-1.886-4.782 0-2.274 1.194-3.39 1.618-3.856.39-.426.94-.54 1.252-.54.31 0 .62.002.89.016.286.014.67-.108 1.044.796.39.944 1.33 3.238 1.444 3.472.116.234.194.506.038.822-.154.316-.23.512-.46.79-.23.278-.484.622-.69.834-.23.234-.47.486-.2.958.27.472 1.2 1.982 2.58 3.212 1.77 1.582 3.26 2.074 3.73 2.306.47.232.742.194 1.014-.116.272-.31 1.158-1.348 1.466-1.82.31-.472.622-.39 1.052-.234.432.154 2.744 1.292 3.216 1.526.472.234.784.35.9.544.118.194.118 1.12-.272 2.22z" />
      </svg>
      {items.length > 0 && (
        <span className="wa-badge">{items.reduce((s, i) => s + i.quantity, 0)}</span>
      )}
    </a>
  );
}
