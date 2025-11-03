// src/App.jsx
import Navbar from "./Navbar";
import Header from "./Header";
import Home from "./Home";

export default function App() {
  return (
    <>
      <Navbar />
      {/* offset sesuai tinggi navbar: 96px di semua breakpoint */}
      <main className="pt-24">
        <Header />
        <Home />
      </main>
    </>
  );
}