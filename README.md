# localista

Aplikasi frontend berbasis Vite + React.

## Fitur
- React 19 + React DOM
- Vite 7 (dev server cepat, HMR)
- ESLint (Flat config)
- React Router DOM sudah terpasang (siap dipakai)

## Persyaratan
- Node.js 18+ (disarankan versi LTS)
- npm (atau pnpm/yarn bila Anda prefer)

## Mulai Cepat
1) Install dependensi

```powershell
npm install
```

2) Jalankan server pengembangan

```powershell
npm run dev
```

Buka alamat yang ditampilkan (biasanya http://localhost:5173).

3) Build untuk produksi

```powershell
npm run build
```

4) Preview hasil build secara lokal

```powershell
npm run preview
```

5) Linting kode

```powershell
npm run lint
```

## Struktur Proyek
- `index.html` — Halaman HTML utama yang memuat bundel React
- `src/main.jsx` — Entrypoint aplikasi React
- `src/App.jsx` — Komponen root aplikasi
- `src/index.css` — Gaya global
- `src/App.css` — Gaya untuk komponen App
- `src/assets/` — Aset yang diimpor melalui bundler
- `public/` — Aset statis tanpa proses bundling (diakses langsung)
- `vite.config.js` — Konfigurasi Vite
- `eslint.config.js` — Konfigurasi ESLint
- `package.json` — Metadata dan skrip proyek

## Catatan Pengembangan
- React Router DOM sudah ada di dependencies. Untuk mulai menggunakan routing, Anda bisa men-setup router di `main.jsx` dan memecah halaman ke dalam folder `src/pages/`.
- Simpan aset kecil ke dalam `src/assets/` dan impor di komponen. Untuk aset statis besar atau yang tidak perlu diproses bundler, tempatkan di `public/`.

## Troubleshooting (Windows)
- Port bentrok? Jalankan dev server di port lain:

```powershell
npm run dev -- --port 5174
```

- Jika linting gagal, cek versi Node dan pastikan dependensi terpasang ulang:

```powershell
rm -r node_modules package-lock.json
npm install
```

---

Dibangun dengan ❤️ menggunakan Vite + React.
