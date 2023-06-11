import api from ".";
import { Author, Book } from "../types";

export const addBook = async (book: Book) => api.post("/books", book);
export const getBooks = async () => api.get("/books");
export const addAuthor = async(author: Author) => api.post("/books/authors", author);
export const getAuthors = async() => api.get("/books/authors");
export const getBook = async(id:string) => api.get(`/books/${id}`);
export const reserveBook = async(id:string) => api.post(`/books/${id}/reserve`);
export const getAllTransactions=async() => api.get(`/books/transactions`);
export const issueBook = async(id:string) => api.post(`/books/${id}/issue`);
export const returnBook = async(id:string) => api.post(`/books/${id}/return`);
