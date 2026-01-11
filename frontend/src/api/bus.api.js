import api from "./axios";

export const getAllBuses = () => api.get("/buses");

export const createBus = (data) => api.post("/buses", data);

export const resetBus = (busId) =>
  api.put(`/buses/reset/${busId}`);
