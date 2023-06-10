import api from ".";
import { Author, Book } from "../types";

export const addBook = async (book: Book) => api.post("/books", book);
export const getBooks = async () => api.get("/books");
export const addAuthor = async(author: Author) => api.post("/books/authors", author);
export const getAuthors = async() => api.get("/books/authors");
