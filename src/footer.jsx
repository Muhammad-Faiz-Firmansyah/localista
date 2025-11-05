import {} from 'react';
import Parallax from "./assets/Parallax.png";

export default function Footer() {
  return (
    <footer className="md:py-50 mt-10 border-t border-slate-200 py-20" style={{ backgroundImage: `url(${Parallax})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6 text-right text-xl font-montserrat font-bold text-black">
        Localista
      </div>
    </footer>
  );
}