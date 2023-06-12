import api from ".";

export const getProfile = async () => api.get("/users/profile");
export const getUserTransactions = async () => api.get("/users/transactions");
export const getNonVerifiedUsers = async () => api.get("/users/nonverified");