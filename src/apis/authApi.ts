import api from ".";

export const login = async (email: string, password: string) => api.post("/auth/login", { email, password });
export const registerUser = async (data:any) => api.post("/auth/register", data);
