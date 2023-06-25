import api from ".";

export const getProfile = async () => api.get("/users/profile");
export const getUserTransactions = async () => api.get("/users/transactions");
export const getNonVerifiedUsers = async () => api.get("/users/nonverified");
export const verifyUser = async (id: string) => api.post(`/users/verify/${id}`);
export const getAllUsers = async () => api.get("/users");
export const createUser = async (data: any) => api.post("/users", data);
export const searchUser = async (adm_no:string) => api.get(`/users/search?adm_no=${adm_no}`);
export const deleteUser = async (id:string) => api.delete(`/users/${id}`);