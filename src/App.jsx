// src/App.jsx
import Navbar from "./Navbar";
import Header from "./Header";
import Home from "./Home";
import Footer from "./footer";
import UmkmDetail from "./UmkmDetail";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      {/* sticky navbar tidak butuh offset; hapus padding-top agar tidak ada jarak putih */}
      <main className="pt-0">
        <Routes>
          <Route path="/" element={<>
            <Header />
            <Home />
          </>} />
          <Route path="/umkm/:section/:id" element={<UmkmDetail />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}