import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Parallax from "./assets/Parallax.png";

function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={(filled ? "text-slate-800" : "text-slate-400") + " h-3.5 w-3.5 inline-block"}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.967 0 1.372 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating = 4 }) {
  return (
    <div className="select-none" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
}

function ProductCard({ product, index }) {
  return (
    <li
      className="group animate-[fade-up_0.5s_ease-out_both]"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm/50 transition-all duration-200 hover:shadow-md">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 rounded-md bg-slate-200" />
        </div>
        <div className="mt-2 space-y-0.5 text-center">
          <p className="line-clamp-1 text-xs font-medium text-slate-800">{product.name}</p>
          <p className="text-[11px] text-slate-500">Rp {product.price.toLocaleString("id-ID")}</p>
        </div>
      </div>
    </li>
  );
}

export default function UmkmDetail() {
  const { section, id } = useParams();
  const [detail, setDetail] = useState(null);
  const [active, setActive] = useState('Minuman');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`http://localhost:4000/api/umkm/${id}`);
        if (!res.ok) throw new Error('Gagal memuat detail');
        const data = await res.json();
        if (cancelled) return;
        setDetail(data);
        const urlMap = { minuman: 'Minuman', makanan: 'Makanan', snack: 'Snack', rekomendasi: 'Minuman' };
        const fromUrl = urlMap[String(section).toLowerCase()];
        if (fromUrl) setActive(fromUrl);
        else {
          const keys = Object.keys(data.products || {});
          const firstWithItems = keys.find(k => (data.products?.[k] || []).length > 0);
          if (firstWithItems) setActive(firstWithItems);
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [id, section]);

  const categories = useMemo(() => detail ? Object.keys(detail.products || {}) : ["Minuman","Makanan","Snack"], [detail]);
  const products = useMemo(() => detail?.products || {}, [detail]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16">
      {/* Breadcrumbs / Back */}
      <div className="flex items-center gap-2 py-4 text-sm text-slate-600">
        <Link to="/" className="hover:underline">Beranda</Link>
        <span>/</span>
        <span className="capitalize">{section}</span>
        <span>/</span>
        <span>UMKM {id}</span>
      </div>

      {/* UMKM Header area (cover + info + map) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm mb-6">
        <div className="grid gap-4 md:grid-cols-[1fr_300px]">
          {/* Left: cover + info */}
          <div className="space-y-3">
            <img src={Parallax} alt="Foto UMKM" className="h-36 sm:h-44 md:h-48 w-full rounded-md object-cover filter grayscale" />
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-md bg-slate-200 shrink-0" />
              <div className="flex-1">
                <h1 className="text-lg md:text-xl font-semibold text-slate-900 leading-tight uppercase tracking-wide">{detail?.name || 'NAMA UMKM'}</h1>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(detail?.rating || 0)} />
                  {detail?.rating !== undefined && <span className="text-xs text-slate-500">({detail.rating.toFixed(1)})</span>}
                </div>
                <p className="text-xs md:text-sm text-slate-600">{detail?.address || 'Alamat singkat, Kota, Provinsi'}</p>
              </div>
            </div>
          </div>

          {/* Right: map placeholder */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 h-44 md:h-52 flex items-center justify-center text-[10px] text-slate-500">
            EMBED GOOGLE MAPS
          </div>
        </div>

        {/* Menu anchor + chips */}
        <div className="mt-5">
          <div className="mb-2">
            <a href="#menu" className="inline-block rounded-md border border-[#5DADE2] bg-white px-2.5 py-1 text-xs font-medium text-[#5DADE2] hover:bg-[#5DADE2]/5">Menu</a>
          </div>
          <nav aria-label="Kategori Produk" className="overflow-x-auto">
            <ul className="flex w-max items-center gap-2">
              {categories.map((c) => (
                <li key={c} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(c)}
                    aria-pressed={active === c}
                    aria-current={active === c ? "true" : undefined}
                    className={
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors border " +
                      (active === c
                        ? "border-rose-400 bg-white text-rose-600"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
                    }
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Produk Grid */}
      <section id="menu" className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-slate-900">Produk</h2>
          <div className="text-xs text-slate-500">Kategori aktif: <span className="capitalize">{active}</span></div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {loading && <p className="text-sm text-slate-500">Memuat detail...</p>}
        {!loading && !error && products[active] && products[active].length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {products[active].map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </ul>
        ) : (!loading && !error) ? (
          <p className="text-sm text-slate-600">Belum ada produk pada kategori ini.</p>
        ) : null}
      </section>
    </div>
  );
}
