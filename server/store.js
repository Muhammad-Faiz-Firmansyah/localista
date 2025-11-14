import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data', 'umkm.json');

function readAll() {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findUmkm({ section, recommended, q, limit } = {}) {
  let items = readAll();
  if (section) {
    items = items.filter(i => String(i.section).toLowerCase() === String(section).toLowerCase());
  }
  if (recommended) {
    items = items.filter(i => i.recommended);
  }
  if (q) {
    const term = q.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(term));
  }
  if (limit) items = items.slice(0, Number(limit));
  return items.map(({ products, ...rest }) => rest); // list view doesn't need products
}

export function getUmkmById(id) {
  const items = readAll();
  const item = items.find(i => String(i.id) === String(id));
  return item || null;
}

// For seeding/updating
export function writeAll(items) {
  const dir = path.dirname(dataPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2), 'utf-8');
}
