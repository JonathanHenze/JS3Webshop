import express from "express";
import db from "./database/db.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(express.json());

const PORT = 3000;


function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}


app.get("/", (req, res) => {
  res.send("Backend works");
});


app.get("/api/products", (req, res) => {

  const products = db
    .prepare("SELECT * FROM products")
    .all();

  res.json(products);
});


app.get("/api/products/:slug", (req, res) => {

  const slug = req.params.slug;

  const product = db
    .prepare("SELECT * FROM products WHERE slug = ?")
    .get(slug);

  if (!product) {
    return res.status(404).json({
      message: "Produkten hittades inte"
    });
  }

  res.json(product);
});


app.post("/api/products", (req, res) => {

  const {
    name,
    description,
    price,
    image,
    category,
    brand,
    sku
  } = req.body;

  const slug = createSlug(name);

  const result = db.prepare(`
    INSERT INTO products (
       name,
      description,
      price,
      image,
      category,
      slug,
      brand,
      sku
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name,
    description,
    price,
    image,
    category,
    slug,
    brand,
    sku
  );

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(product);
});


app.delete("/api/products/:id", (req, res) => {

  const id = req.params.id;

  db.prepare(`
    DELETE FROM products
    WHERE id = ?
  `).run(id);

  res.json({
    message: "Produkten raderades"
  });
});


app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});