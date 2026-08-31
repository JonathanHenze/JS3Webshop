import Database from "better-sqlite3"

//öppnar databasen eller skapar den om den inte finns
const db: Database.Database = new Database("webshop.db");

// skapar tabellen products om den inte redan finns
db.prepare(`
    CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category TEXT
    )
`).run();

//kollar hur många produkter som redan finns
const productCount = db
.prepare("SELECT COUNT(*) AS count FROM products")
.get() as { count: number };

// lägger bara in testprodukter om db är tom 
if (productCount.count === 0) {

// skapar en en sql fråga för att lägga till en produkt
const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, image, category)
    VALUES (?, ?, ?, ?, ?)
    `)
 //Test prudokter bara
insertProduct.run(
    "Vit T-shirt",
    "En vit t-shirt",
    299,
    "white-tshirt.jpg",
    "T-shirts"
);
insertProduct.run(
    "Grå Hoodie",
    "En grå hoodie med luva",
    599,
    "grey-hoodie.jpg",
    "Hoodies"
);

}

//exportar databasen
export default db;