import axios from "axios";
import api from "./api";
import {
  getWaitersStart,
  getWaitersSuccess,
  getWaitersFailure,
} from "../redux/slice/waiter";

const WaiterService = {
  // Barcha ofitsiyantlarni olish
  getWaiters: async (dispatch) => {
    dispatch(getWaitersStart());
    try {
      const { data } = await api.get("/waiters");
      dispatch(getWaitersSuccess(data.data));
    } catch (error) {
      dispatch(getWaitersFailure(error.message));
    }
  },

  // Yangi ofitsiyant qo'shish
  postWaiter: async (waiterData) => {
    return await api.post("/waiters", waiterData);
  },

  // Ofitsiyantni yangilash
  updateWaiter: async (id, waiterData) => {
    return await api.put(`/waiters/${id}`, waiterData);
  },

  // Ofitsiyantni o'chirish
  deleteWaiter: async (id) => {
    return await api.delete(`/waiters/${id}`);
  },

  // Status o'zgartirish
  toggleStatus: async (id) => {
    return await api.patch(`/waiters/${id}/toggle-status`);
  },
};

export default WaiterService;
