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

function openDetail(section, id) {
  window.dispatchEvent(new CustomEvent("app:open-detail", { detail: { section, id } }));
  console.log("open detail", { section, id });
}

function ItemCard({ section, id }) {
  return (
    <li className="flex flex-col gap-2">
      <div className="h-24 rounded-lg bg-slate-200" />
      <div className="space-y-2">
        <p className="text-sm text-slate-700">Nama Tempat</p>
        <StarRating rating={4} />
        <div>
          <button
            type="button"
            onClick={() => openDetail(section, id)}
            className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50 active:bg-slate-100"
            aria-label={`Detail untuk item ${id} di ${section}`}
          >
            Detail
          </button>
        </div>
      </div>
    </li>
  );
}

function SectionPanel({ title }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-slate-800">{title}</h3>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {[1,2,3,4].map((id) => (
          <ItemCard key={id} section={title} id={id} />
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 pb-16 space-y-6 md:space-y-8">
      <SectionPanel title="Makanan" />
      <SectionPanel title="Minuman" />
      <SectionPanel title="Jasa" />
      <SectionPanel title="Fashion" />
      <SectionPanel title="Sembako" />
    </div>
  );
}
