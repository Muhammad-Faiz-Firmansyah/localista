// Hero Header with full-bleed image and floating category bar
import { useState } from "react";

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
      <div className="relative w-full">
        <img
          // src="https://reformedfilmlab.com/cdn/shop/articles/Street_Photography.jpg?v=1642503461" <-- Foto -->
          alt="Keramaian kota"
          className="h-[220px] sm:h-[260px] md:h-80 w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0" />
      </div>

      {/* Floating category bar */}
      <div className="mx-auto max-w-7x1 px-4 md:px-6">
        <div className="-mt-5 flex justify-center">
          <nav aria-label="Kategori" className="w-full">
            <ul className="mx-auto flex w-max max-w-full list-none items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-md">
              {categories.map(({ key, label, icon }) => (
                <li key={key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(key)}
                    className={
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors " +
                      (active === key
                        ? "bg-rose-500 text-white"
                        : "text-slate-700 hover:bg-slate-50")
                    }
                  >
                    {icon({ className: active === key ? "text-white" : "text-slate-500" })}
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
