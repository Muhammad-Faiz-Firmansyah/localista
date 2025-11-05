import {} from 'react';
import Parallax from "./assets/Parallax.png";

export default function Footer() {
  return (
    <footer className="relative md:py-50 mt-10 border-t border-slate-200 pt-20 flex flex-col">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${Parallax})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, filter: 'grayscale(100%)' }}></div>
      <div className="relative flex items-center px-4 md:px-6 ">

        <div className="w-20 h-20 bg-white flex items-center justify-center text-black font-bold rounded-md">
        Logo
        </div>

        <div className="bg-amber-50 text-xl md:text-2xl font-montserrat font-bold text-black ml-auto">
          Localista
        </div>
      </div>  
      <div className="relative text-sm md:text-base text-slate-700 px-4 md:px-6 bg-amber-50 py-4 rounded-md mt-auto">
      a
      </div>
    </footer>
  );
}
