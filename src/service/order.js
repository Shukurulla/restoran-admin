import axios from "./api";

const OrderService = {
  async getOrders() {
    const { data } = await axios.get("/orders");
    return data;
  },
  async postOrders(order) {
    const { data } = await axios.post("/orders", order);
    return data;
  },
};

export default OrderService;
