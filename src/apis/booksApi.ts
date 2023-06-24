import api from ".";
import { Book } from "../types";

export const addBook = async (book: Book) => api.post("/books", book);
export const getBooks = async () => api.get("/books");
export const getBook = async(id:string) => api.get(`/books/${id}`);
export const reserveBook = async(id:string) => api.post(`/books/${id}/reserve`);
export const getAllTransactions=async() => api.get(`/books/transactions`);
export const issueBook = async(id:string) => api.post(`/books/${id}/issue`);
export const returnBook = async(id:string) => api.post(`/books/${id}/return`);
export const searchBook = async (title:string) => api.get(`/books/search?title=${title}`);

