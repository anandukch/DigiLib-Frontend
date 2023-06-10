import api from ".";

export const getProfile = async () => api.get("/users/profile");