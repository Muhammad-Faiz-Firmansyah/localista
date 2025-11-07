import express from 'express';
import cors from 'cors';
import umkm from './data/umkm.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// List UMKM with optional filters: section, q, limit
app.get('/api/umkm', (req, res) => {
  const { section, q, limit } = req.query;
  let items = [...umkm];
  if (section) {
    const s = String(section).toLowerCase();
    if (s === 'rekomendasi') {
      items = items.filter((i) => i.recommended);
    } else {
      items = items.filter((i) => i.section.toLowerCase() === s);
    }
  }
  if (q) {
    const term = String(q).toLowerCase();
    items = items.filter((i) => i.name.toLowerCase().includes(term));
  }
  const n = Number(limit) || items.length;
  res.json(items.slice(0, n));
});

// Get UMKM detail by id
app.get('/api/umkm/:id', (req, res) => {
  const id = String(req.params.id);
  const item = umkm.find((i) => String(i.id) === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
