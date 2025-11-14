// Home sections: Makanan, Minuman, Jasa, Fashion, Sembako
// Simple placeholder cards to match the Figma structure
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

import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function ItemCard({ section, id, name = "Nama Tempat", rating = 4 }) {
  return (
    <li className="group flex flex-col gap-2 animate-[fade-up_0.5s_ease-out_both]" style={{ animationDelay: `${id * 60}ms` }}>
      <div className="h-24 rounded-lg bg-slate-200 transition-all duration-200 group-hover:shadow-md group-hover:scale-[1.02]" />
      <div className="space-y-2">
        <p className="text-sm text-slate-700">{name}</p>
        <StarRating rating={rating} />
        <div>
          <Link
            to={`/umkm/${String(section).toLowerCase()}/${id}`}
            title="Klik untuk melihat detail"
            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 active:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5DADE2]/40 cursor-pointer"
            aria-label={`Detail untuk item ${id} di ${section}`}
          >
            Detail
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}

function SectionPanel({ id, title, items }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm animate-[fade-up_0.5s_ease-out_both]">
      <h3 className="mb-4 text-lg font-medium text-slate-800">{title}</h3>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, idx) => (
          <ItemCard key={item.id || idx} section={(item.section || title)} id={item.id || idx} name={item.name} rating={item.rating}
          />
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  const [data, setData] = useState({ rekomendasi: [], makanan: [], minuman: [], jasa: [], fashion: [], sembako: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState('rekomendasi');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const base = 'http://localhost:4000/api/umkm';
        const sections = ['rekomendasi','makanan','minuman','jasa','fashion','sembako'];
        const results = await Promise.all(sections.map(async (s) => {
          const url = s === 'rekomendasi' ? `${base}?section=rekomendasi&limit=4` : `${base}?section=${s}&limit=4`;
          const res = await fetch(url);
          if (!res.ok) throw new Error('Gagal fetch ' + s);
          return res.json();
        }));
        if (!cancelled) {
          setData({
            rekomendasi: results[0],
            makanan: results[1],
            minuman: results[2],
            jasa: results[3],
            fashion: results[4],
            sembako: results[5],
          });
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Listen to category selection from Header
  useEffect(() => {
    const onSelect = (e) => {
      const id = e.detail?.id;
      if (!id) return;
      if (id === 'all') {
        setSelectedSection('all');
      } else {
        setSelectedSection(id);
      }
    };
    window.addEventListener('app:section-selected', onSelect);
    return () => window.removeEventListener('app:section-selected', onSelect);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16 space-y-6 md:space-y-8">
      {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      {loading && <div className="text-sm text-slate-500">Memuat data UMKM...</div>}
      {!loading && (
        <>
          {(selectedSection === 'all' || selectedSection === 'rekomendasi') && <SectionPanel id="rekomendasi" title="Rekomendasi" items={data.rekomendasi} />}
          {(selectedSection === 'all' || selectedSection === 'makanan') && <SectionPanel id="makanan" title="Makanan" items={data.makanan} />}
          {(selectedSection === 'all' || selectedSection === 'minuman') && <SectionPanel id="minuman" title="Minuman" items={data.minuman} />}
          {(selectedSection === 'all' || selectedSection === 'jasa') && <SectionPanel id="jasa" title="Jasa" items={data.jasa} />}
          {(selectedSection === 'all' || selectedSection === 'fashion') && <SectionPanel id="fashion" title="Fashion" items={data.fashion} />}
          {(selectedSection === 'all' || selectedSection === 'sembako') && <SectionPanel id="sembako" title="Sembako" items={data.sembako} />}
        </>
      )}
    </div>
  );
}
