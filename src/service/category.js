import axios from "./api";
const CategoryService = {
  async getCategory() {
    const { data } = await axios.get("/categories");
    return data;
  },
  async postCategory(category) {
    const { data } = await axios.post("/categories", category);
    return data;
  },
  async editCategory(id, category) {
    const { data } = await axios.post(`/edit-category/${id}`, category);
    return data;
  },
  async deleteCategory(id) {
    const { data } = await axios.post(`/delete-category/${id}`);
    return data;
  },
};

export default CategoryService;
