import axios from "./api";
const DiscontService = {
  async getDiscount() {
    const { data } = await axios.get("/discount");
    return data;
  },
};
