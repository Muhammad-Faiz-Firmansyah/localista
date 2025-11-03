// src/App.jsx
import Navbar from "./Navbar";
import Header from "./Header";
import Home from "./Home";

export default function App() {
  return (
    <>
      <Navbar />
      {/* sticky navbar tidak butuh offset; hapus padding-top agar tidak ada jarak putih */}
      <main className="pt-0">
        <Header />
        <Home />
      </main>
    </>
  );
}