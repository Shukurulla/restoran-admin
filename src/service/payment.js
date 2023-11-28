import axios from "./api";
const PaymentService = {
  async getPayments() {
    const { data } = await axios.get("/save-orders");
    return data;
  },

  async postPayment(payment) {
    const { data } = await axios.post("/save-orders", payment);
    return data;
  },
  async editPayment(id, payment) {
    const { data } = await axios.post(`/edit-save-orders/${id}`, payment);
    return data;
  },
  async deletePayment(id) {
    const { data } = await axios.post(`/delete-save-orders/${id}`);
    return data;
  },
};

export default PaymentService;
