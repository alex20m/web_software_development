import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { createBook, showForm, showBook, updateBook, deleteBook } from "./bookController.js";

const app = new Hono();

app.get("/books", showForm);
app.post("/books", createBook);
app.get("/books/:id", showBook);
app.post("/books/:id", updateBook);
app.post("/books/:id/delete", deleteBook);

export default app;