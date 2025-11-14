import express from 'express';
import cors from 'cors';
// Replace static data with SQLite queries
// Use JSON store to avoid native dependencies
import { findUmkm, getUmkmById } from './store.js';

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
  try {
    const items = findUmkm({
      section: section && section !== 'rekomendasi' ? section : undefined,
      recommended: section === 'rekomendasi',
      q,
      limit: limit ? Number(limit) : undefined,
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Query error', detail: e.message });
  }
});

// Get UMKM detail by id
app.get('/api/umkm/:id', (req, res) => {
  try {
    const id = String(req.params.id);
    const item = getUmkmById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Query error', detail: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
