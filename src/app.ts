import express from "express";
import {randomUUID} from "node:crypto";
/*import supabase from "./config/supabase.js";
import Livros from "./models/Livros.js";
import Autor from "./models/Autor.js"; */

const app = express();

app.use(express.json());

const domCasmurroId = randomUUID();
const livro1984Id = randomUUID();
const grandeSertaoId = randomUUID();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Biblioteca System API",
        version: "1.0.0",
    });
});

const books = [
  {
    id: domCasmurroId,
    title: "Dom Casmurro",
    description:
      "Romance narrado por Bentinho, que revive sua juventude e as suspeitas sobre a fidelidade de Capitu.",
    publishedYear: 1899,
    available: true,
  },
  {
    id: livro1984Id,
    title: "1984",
    description:
      "Distopia sobre um regime totalitário que vigia e controla todos os aspectos da vida dos cidadãos.",
    publishedYear: 1949,
    available: true,
  },
  {
    id: grandeSertaoId,
    title: "Grande Sertão: Veredas",
    description:
      "A narrativa de Riobaldo, jagunço do sertão mineiro, sobre amor, coragem e o pacto com o demônio.",
    publishedYear: 1956,
    available: false,
  },
];

const authors = [
  {
    id: randomUUID(),
    bookId: domCasmurroId,
    name: "Machado de Assis",
    nationality: "Brasileiro",
    birthYear: 1839,
  },
  {
    id: randomUUID(),
    bookId: livro1984Id,
    name: "George Orwell",
    nationality: "Britânico",
    birthYear: 1903,
  },
  {
    id: randomUUID(),
    bookId: grandeSertaoId,
    name: "João Guimarães Rosa",
    nationality: "Brasileiro",
    birthYear: 1908,
  },
];

// =================
// Livros
// =================

app.get("/books", (req, res) => {
    res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find((book) => {
        return book.id == req.params.id;
    });

    if(!book){
        return res.status(404).json({
            message: "Livro nao encontrado.",
        });
    }
    res.status(200).json(book);
})

app.post("/books", (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).json(book);
});


// =================
// Autores
// =================

app.get("/authors", (req, res) => {
    res.status(200).json(authors);
});

app.post("/authors", (req, res) => {
  const author = req.body;
  authors.push(author);
  res.status(201).json(author);
})


export default app;