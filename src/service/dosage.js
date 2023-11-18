import axios from "./api";

const DosageService = {
  async getDosage() {
    const { data } = await axios.get("/dosages");
    return data;
  },
  async postDosage(dosage) {
    const { data } = await axios.post("/dosage", dosage);
    return data;
  },
  async editDosage(id, dosage) {
    const { data } = await axios.post(`/edit-dosage/${id}`, dosage);
    return data;
  },
  async deleteDosage(id) {
    const { data } = await axios.post(`/delete-dosage/${id}`);
    return data;
  },
};

export default DosageService;
