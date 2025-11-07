// Minimalist Navbar: brand + centered search + mobile hamburger
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef(null);
  const inputRef = useRef(null);

  // Close on Escape (accessibility)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
      // Quick focus: '/' focuses the search when not typing in an input/textarea
      if (e.key === "/") {
        const tag = (e.target && e.target.tagName) || "";
        const isTyping = ["INPUT", "TEXTAREA"].includes(tag);
        if (!isTyping) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu on outside click (mobile UX)
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  // Lock body scroll while menu is open (mobile UX)
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    // Fire a lightweight event other parts of the app can hook into
    window.dispatchEvent(new CustomEvent("app:search", { detail: { q } }));
    // Fallback log for now (no router yet)
    console.log("search:", q);
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-[#5DADE2] text-white "
      aria-label="Main navigation"
    >
      {/* 3-column grid ensures the center stays centered */}
  <div className="mx-auto grid h-24 w-full max-w-7xl grid-cols-3 items-center gap-3 px-4 md:px-6">
        {/* Left: brand */}
        <Link
          to="/"
          className="justify-self-start shrink-0 no-underline text-white font-bold text-[18px] md:text-[20px] tracking-[-0.01em] leading-none font-montserrat"
        >
          Localista
        </Link>

        {/* Center: search */}
        <form
          role="search"
          action="#"
          onSubmit={onSubmit}
          className="col-start-2 col-end-3 flex justify-center"
        >
          <label htmlFor="q" className="sr-only">
            Cari
          </label>
          <span className="relative w-[85vw] max-w-[600px] md:w-[500px]">
            <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-[#5DADE2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </span>
            <input
              id="q"
              name="q"
              type="search"
              ref={inputRef}
              placeholder="Cari..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              enterKeyHint="search"
              style={{ backgroundColor: '#FFFFFF', border: 'none' }}
              className="h-11 w-full rounded-full pl-12 pr-5 text-sm text-slate-900 placeholder-slate-500 outline-none shadow-md focus:shadow-lg focus:outline-none transition-shadow"
            />
          </span>
        </form>

        {/* Right: mobile hamburger (hidden on md+) */}
        <button
          type="button"
          className="justify-self-end inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 md:hidden"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden absolute inset-x-0 top-24 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm"
          role="menu"
        >
          <li role="none">
            <Link to="/" role="menuitem" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-slate-700 hover:bg-slate-50 no-underline">
              Home
            </Link>
          </li>
          <li role="none">
            <a href="#" role="menuitem" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-slate-700 hover:bg-slate-50 no-underline">
              Explore
            </a>
          </li>
          <li role="none">
            <a href="#" role="menuitem" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-slate-700 hover:bg-slate-50 no-underline">
              Profile
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
