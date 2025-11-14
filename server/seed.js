import fs from 'fs';
import path from 'path';
import slugify from './util/slugify.js';
import { writeAll } from './store.js';
import { fileURLToPath } from 'url';

// Resolve stable paths regardless of where the script is invoked from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Root of provided asset folders (adjust if different)
const sourceRoot = path.resolve(projectRoot, '../Downloads/WIA - Konten Website/WIA - Konten Website');

// Category mapping folder -> section key used in app
const categories = ['Minuman','Makanan','Jasa','Fashion','Sembako'];

function readDirectories() {
  const result = [];
  for (const cat of categories) {
    const catPath = path.join(sourceRoot, cat);
    if (!fs.existsSync(catPath)) continue;
    const entries = fs.readdirSync(catPath, { withFileTypes: true });
    for (const dirent of entries) {
      if (dirent.isDirectory()) {
        const rawName = dirent.name;
        // Skip generic placeholder folders
        if (/^New folder/i.test(rawName)) continue;
        const slug = slugify(rawName);
        const item = {
          name: normaliseName(rawName),
          section: cat.toLowerCase(),
          slug,
          rating: 0,
          address: '',
          recommended: 0,
          coverImage: `/umkm/${cat.toLowerCase()}/${slug}/cover.jpg`
        };
        result.push(item);
      }
    }
  }
  return result;
}

function normaliseName(name) {
  return name.replace(/[_-]/g,' ').replace(/\s+/g,' ').trim();
}

function seed() {
  const base = readDirectories();
  // assign incremental IDs
  const items = base.map((u, idx) => ({
    id: idx + 1,
    ...u,
    // simple sample products per kategori
    products: {
      Minuman: u.section === 'minuman' ? [ { id: 1, name: 'Es Teh Manis', price: 6000 } ] : [],
      Makanan: u.section === 'makanan' ? [ { id: 1, name: 'Nasi Goreng', price: 18000 } ] : [],
      Snack: u.section === 'minuman' ? [ { id: 1, name: 'Roti Bakar', price: 15000 } ] : []
    }
  }));

  console.log(`Seeding ${items.length} UMKM (JSON store)...`);
  // copy covers
  for (const umkm of items) {
    try {
      const srcDir = path.join(sourceRoot, capitalize(umkm.section), denormaliseName(umkm.name));
      const imgPath = findFirstImage(srcDir);
      if (imgPath) {
        const targetDir = path.join(projectRoot, 'public', 'umkm', umkm.section, umkm.slug);
        fs.mkdirSync(targetDir, { recursive: true });
        const ext = path.extname(imgPath).toLowerCase();
        const target = path.join(targetDir, `cover${ext || '.jpg'}`);
        fs.copyFileSync(imgPath, target);
        // update stored cover path to actual ext
        umkm.coverImage = `/umkm/${umkm.section}/${umkm.slug}/cover${ext || '.jpg'}`;
      }
    } catch (e) {
      console.warn('Gagal menyalin cover untuk', umkm.name, e.message);
    }
  }

  writeAll(items);
  console.log('Selesai menulis server/data/umkm.json');
}

function findFirstImage(dir) {
  if (!fs.existsSync(dir)) return null;
  const stack = [dir];
  const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp']);
  while (stack.length) {
    const cur = stack.pop();
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(cur, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (allowed.has(path.extname(ent.name).toLowerCase())) return full;
    }
  }
  return null;
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function denormaliseName(s) { return s; }

seed();
