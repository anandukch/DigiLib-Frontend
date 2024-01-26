import api from ".";
import { Book } from "../types";

export const addBook = async (book: Book) => api.post("/books", book);
export const getBooks = async () => api.get("/books");
export const getSubjects = async () => api.get("/books/subjects");
export const getBook = async(id:string) => api.get(`/books/${id}`);
export const reserveBook = async(id:string) => api.post(`/books/${id}/reserve`);
export const getAllTransactions=async() => api.get(`/books/transactions`);
export const issueBook = async(id:string) => api.post(`/books/${id}/issue`);
export const returnBook = async(id:string) => api.post(`/books/${id}/return`);
export const searchBook = async (title:string) => api.get(`/books/search?title=${title}`);
export const deleteBook = async (id:string) => api.delete(`/books/${id}`);
export const immediateIssue = async (data:any) => api.post(`/books/issue`,data);
export const getPopularBooks = async () => api.get(`/books/recommendations`);