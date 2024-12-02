import apiConfig from "../baseApi";

const CategoryApi = {
  getListCategory: () => {
    return apiConfig.get("http://localhost:3000/category");
  },
  getPaginatedcategory: (page,limit) => {
    return apiConfig.get(
      `http://localhost:3000/category?_page=${page}&_per_page=${limit}`
    );
  },
  deleteCategory: (id) => {
    return apiConfig.delete(`http://localhost:3000/category/${id}`);
  },
  addCategory: (newCategory) => {
    return apiConfig.post("http://localhost:3000/category", newCategory);
  },
  updateCategory: (id, updatedCategory) => {
    return apiConfig.put(`http://localhost:3000/category/${id}`, updatedCategory);
  },
  getEmailExists: (email) => {
    return apiConfig.get(`http://localhost:3000/category?email=${email}`);
  },
};

export default CategoryApi;
