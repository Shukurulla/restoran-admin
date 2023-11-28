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
  async editOrder(id, order) {
    const { data } = await axios.post(`/edit-order/${id}`, order);
    return data;
  },
  async deleteOrder(id) {
    const { data } = await axios.post(`/delete-order/${id}`);
    return data;
  },
};

export default OrderService;
