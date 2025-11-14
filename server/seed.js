import fs from 'fs';
import path from 'path';
import slugify from './util/slugify.js';
import { upsertUmkm, insertProduct } from './db.js';

// Root of provided asset folders (adjust if different)
const sourceRoot = path.resolve(process.cwd(), '../Downloads/WIA - Konten Website/WIA - Konten Website');

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
        const item = {
          name: normaliseName(rawName),
          section: cat.toLowerCase(),
          slug: slugify(rawName),
          rating: 0,
          address: '',
          recommended: 0,
          coverImage: `/umkm/${cat.toLowerCase()}/${slugify(rawName)}/cover.jpg`
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
  const items = readDirectories();
  console.log(`Seeding ${items.length} UMKM...`);
  for (const umkm of items) {
    upsertUmkm(umkm);
    // Optional: insert placeholder products example
    if (umkm.section === 'minuman') {
      insertProduct({ umkm_id: getIdBySlug(umkm.slug), category: 'Minuman', name: 'Produk Contoh 1', price: 10000 });
    }
  }
  console.log('Selesai seeding.');
}

import db from './db.js';
function getIdBySlug(slug) {
  return db.prepare('SELECT id FROM umkm WHERE slug=?').get(slug)?.id;
}

seed();
