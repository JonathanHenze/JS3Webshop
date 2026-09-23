import Database from "better-sqlite3";

const db: Database.Database = new Database("webshop.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category TEXT,
    slug TEXT,
    brand TEXT,
    sku TEXT
  )
`).run();


const columns = db
  .prepare("PRAGMA table_info(products)")
  .all() as { name: string }[];


if (!columns.some(column => column.name === "slug")) {

  db.prepare(`
    ALTER TABLE products
    ADD COLUMN slug TEXT
  `).run();

}
if (!columns.some(column => column.name === "brand")) {
  db.prepare(`
    ALTER TABLE products
    ADD COLUMN brand TEXT
  `).run();
}


if (!columns.some(column => column.name === "sku")) {
  db.prepare(`
    ALTER TABLE products
    ADD COLUMN sku TEXT
  `).run();
}


function createSlug(name: string) {

  return name
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

}


const productsWithoutSlug = db
  .prepare(`
    SELECT id, name
    FROM products
    WHERE slug IS NULL OR slug = ''
  `)
  .all() as { id: number; name: string }[];


const updateSlug = db.prepare(`
  UPDATE products
  SET slug = ?
  WHERE id = ?
`);

for (const product of productsWithoutSlug) {

  const slug = createSlug(product.name);

  updateSlug.run(slug, product.id);
}

export default db;