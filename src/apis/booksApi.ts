import api from ".";
import { Author } from "../types";

export const addAuthor = async(author: Author) => api.post("/books/authors", author);
export const getAuthors = async() => api.get("/books/authors");
