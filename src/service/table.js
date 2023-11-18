import axios from "./api";

const TableService = {
  async getTables() {
    const { data } = await axios.get("/tables");
    return data;
  },
  async postTable(table) {
    const { data } = await axios.post("/tables", table);
    return data;
  },
  async editTable(id, table) {
    const { data } = await axios.post(`/edit-tables/${id}`, table);
    return data;
  },
  async deleteTable(id) {
    const { data } = await axios.post(`/delete-tables/${id}`);
    return data;
  },
};

export default TableService;
