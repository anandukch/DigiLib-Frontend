import api from ".";

export const getPopularBooks = async () => api.get(`/books/recommendations`);
export const getBook = async (title: String) =>
  api.get("/books/recommendations?title=" + title);

export const getBookRecommendations = async (values: (0|1)[]) =>
  api.post("/books/v2/recommendations", { values });
