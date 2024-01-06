import axios from "./api";
const ServiceApi = {
  async getSerives() {
    const { data } = await axios.get("/services");
    return data;
  },
  async postService(service) {
    const { data } = await axios.post("/post-services", service);
    return data;
  },
  async editService(id, service) {
    const { data } = await axios.post(`/edit-service/${id}`, service);
    return data;
  },
  async deleteService(id) {
    const { data } = await axios.post(`/delete-service/${id}`);
    return data;
  },
};
export default ServiceApi;
