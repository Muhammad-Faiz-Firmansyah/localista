import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file stored in project root under server/data.db
const dbPath = path.join(__dirname, 'data.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`CREATE TABLE IF NOT EXISTS umkm (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  section TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  rating REAL DEFAULT 0,
  address TEXT,
  recommended INTEGER DEFAULT 0,
  coverImage TEXT
);`);

db.exec(`CREATE TABLE IF NOT EXISTS product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  umkm_id INTEGER NOT NULL REFERENCES umkm(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0
);`);

export function upsertUmkm(item) {
  const stmt = db.prepare(`INSERT INTO umkm (name, section, slug, rating, address, recommended, coverImage)
    VALUES (@name, @section, @slug, COALESCE(@rating,0), @address, @recommended, @coverImage)
    ON CONFLICT(slug) DO UPDATE SET
      name=excluded.name,
      section=excluded.section,
      rating=excluded.rating,
      address=excluded.address,
      recommended=excluded.recommended,
      coverImage=excluded.coverImage`);
  stmt.run(item);
}

export function insertProduct(p) {
  const stmt = db.prepare(`INSERT INTO product (umkm_id, category, name, price) VALUES (@umkm_id, @category, @name, @price)`);
  stmt.run(p);
}

export function findUmkm(filter = {}) {
  let sql = 'SELECT * FROM umkm';
  const clauses = [];
  const params = {};
  if (filter.section) {
    clauses.push('LOWER(section)=LOWER(@section)');
    params.section = filter.section;
  }
  if (filter.recommended) {
    clauses.push('recommended=1');
  }
  if (filter.q) {
    clauses.push('LOWER(name) LIKE @q');
    params.q = `%${filter.q.toLowerCase()}%`;
  }
  if (clauses.length) sql += ' WHERE ' + clauses.join(' AND ');
  sql += ' ORDER BY id DESC';
  if (filter.limit) sql += ' LIMIT ' + Number(filter.limit);
  return db.prepare(sql).all(params);
}

export function getUmkmById(id) {
  const umkmStmt = db.prepare('SELECT * FROM umkm WHERE id=?');
  const item = umkmStmt.get(id);
  if (!item) return null;
  const products = db.prepare('SELECT * FROM product WHERE umkm_id=? ORDER BY id DESC').all(id);
  const grouped = products.reduce((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});
  return { ...item, products: grouped };
}

export default db;
