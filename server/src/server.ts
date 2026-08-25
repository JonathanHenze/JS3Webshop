import express from "express";


// skapar em server
const app = express();

// porten som servern körs på
const PORT = 3000;

// gör så servern kan ta emot json
app.use(express.json());

// en test-route för att se att servern fungerar
app.get("/", (req, res) => {

//skickar ett svar tillbaka
res.send("Backend works");
});

// startar servern på port 3000
app.listen(PORT, () => {


// skriver ut i terminalen när servern startat
   console.log(`Servern körs på http://localhost:${PORT}`);
});

