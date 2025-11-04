// Hero Header with full-bleed image and floating category bar
import { useState } from "react";
import Parallax from "./assets/Parallax.png";

export default function Header() {
  const categories = [
    { key: "reco", label: "Rekomendasi", icon: RecoIcon },
    { key: "food", label: "Makanan", icon: FoodIcon },
    { key: "drink", label: "Minuman", icon: DrinkIcon },
    { key: "service", label: "Jasa", icon: ServiceIcon },
    { key: "fashion", label: "Fashion", icon: FashionIcon },
    { key: "grocery", label: "Sembako", icon: GroceryIcon },
  ];

  const [active, setActive] = useState("reco");

  return (
    <header className="relative">
      {/* Full-bleed hero image */}
  <div className="relative z-0 w-full">
        <img
          src={Parallax}
          alt="Keramaian kota"
          className="h-[220px] sm:h-[260px] md:h-80 w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 to-transparent" />
      </div>

      {/* Floating category bar */}
    <div className="mx-auto max-w-7xl px-4 md:px-6 z-10 m-7 relative">
        <div className="-mt-5 hidden md:flex md:justify-center">
          <nav aria-label="Kategori" className="w-full">
            <ul className="mx-auto flex w-max max-w-full list-none items-center gap-2 overflow-x-auto rounded-full border border-slate-300 bg-white px-3 py-2 shadow-lg">
              {categories.map(({ key, label, icon }) => (
                <li key={key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(key)}
                    className={
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors border " +
                      (active === key
                        ? "border-rose-300 bg-rose-100 text-rose-700"
                        : "border-transparent text-slate-700 hover:bg-slate-50")
                    }
                  >
                    {/* Tampilkan ikon kategori saja (tanpa dot), sesuai Figma */}
                    {icon({ className: active === key ? "text-rose-600" : "text-slate-500" })}
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Section heading below bar */}
        <h2 className="mt-8 text-xl font-semibold text-slate-900">Rekomendasi</h2>
      </div>
    </header>
  );
}

function RecoIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FoodIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h16M7 10v10m5-10v10m5-10v10" />
    </svg>
  );
}

function DrinkIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 4h18l-2 7H5L3 4z" />
      <path d="M7 11v6a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-6" />
    </svg>
  );
}

function ServiceIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 18v4M16.24 7.76l2.83-2.83M18 12h4M16.24 16.24l2.83 2.83" />
    </svg>
  );
}

function FashionIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3h6l1 4H8l1-4z" />
      <path d="M7 7h10l2 12H5L7 7z" />
    </svg>
  );
}

function GroceryIcon({ className = "" }) {
  return (
    <svg className={"h-4 w-4 " + className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6h15l-1.5 9H8L6 6z" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}

// (Dot indicator removed to follow Figma spec)
