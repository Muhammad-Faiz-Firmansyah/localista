import Parallax from "./assets/Parallax.png";

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-slate-200 py-8 md:py-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${Parallax})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          filter: "grayscale(100%)",
        }}
      />
      <div className="relative flex items-center px-4 md:px-6 py-2">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-white flex items-center justify-center text-black font-bold rounded-md shadow-sm">
          Logo
        </div>
        <div className="ml-auto text-xl md:text-2xl font-montserrat font-bold text-black">
          Localista
        </div>
      </div>
    </footer>
  );
}
