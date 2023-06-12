import api from ".";

export const getProfile = async () => api.get("/users/profile");
export const getUserTransactions = async () => api.get("/users/transactions");
export const getNonVerifiedUsers = async () => api.get("/users/nonverified");
export const verifyUser = async (id: string) => api.post(`/users/verify/${id}`);
export const getAllUsers = async () => api.get("/users");