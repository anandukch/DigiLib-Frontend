import api from ".";
import { LibConfigType } from "../types";

export const get_lib_config = async () => api.get("/library");

export const add_lib_config = async (data: LibConfigType) => api.post("/library", data);
