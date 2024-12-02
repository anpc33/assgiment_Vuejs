import apiConfig from "../baseApi";

const orderApi = {
  getListorder: () => {
    return apiConfig.get("http://localhost:3000/order");
  },
  getPaginatedorder: (page,limit) => {
    return apiConfig.get(
      `http://localhost:3000/order?_page=${page}&_per_page=${limit}`
    );
  },
  deleteorder: (id) => {
    return apiConfig.delete(`http://localhost:3000/order/${id}`);
  },
  addorder: (neworder) => {
    return apiConfig.post("http://localhost:3000/order", neworder);
  },
  updateorder: (id, updatedorder) => {
    return apiConfig.put(`http://localhost:3000/order/${id}`, updatedorder);
  },
  getEmailExists: (email) => {
    return apiConfig.get(`http://localhost:3000/order?email=${email}`);
  },
};

export default orderApi;
