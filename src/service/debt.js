import axios from "./api";

const DebtService = {
  async getDebt() {
    const { data } = await axios.get("/debt");
    return data;
  },
  async postDebt(debt) {
    const { data } = await axios.post("/debt", debt);
    return data;
  },
  async editDebt(id, debt) {
    const { data } = await axios.post(`/edit-debt/${id}`, debt);
    return data;
  },
  async deleteDebt(id) {
    const { data } = await axios.post(`/delete-debt/${id}`);
    return data;
  },
};

export default DebtService;
