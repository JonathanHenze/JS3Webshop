import express from "express";

import db from "./database/db.js";

// importerar cors
import cors from "cors";

// skapar em server
const app = express();

// tillåter angular appen att prata med backend
app.use(cors({
  origin: "http://localhost:4200"
}));

// porten som servern körs på
const PORT = 3000;

// gör så servern kan ta emot json
app.use(express.json());

// en test-route för att se att servern fungerar
app.get("/", (req, res) => {


//skickar ett svar tillbaka
res.send("Backend works");
});
//hämtar alla produkter från db
app.get("/api/products", (req, res) => {

   // kör sql och hämtar alla produkter
   const products = db.prepare("SELECT * FROM products").all();

   // skickar tillbaka produkterna som json
   res.json(products);
});

// startar servern på port 3000
app.listen(PORT, () => {

// skriver ut i terminalen när servern startat
   console.log(`Servern körs på http://localhost:${PORT}`);
});

