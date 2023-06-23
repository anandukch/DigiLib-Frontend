import api from ".";


export const getNotifications = async () => api.get("/notifications");
export const sendNotification = async (data: any) => api.post("/notifications", data);