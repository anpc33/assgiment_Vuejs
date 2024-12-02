import apiConfig from "../baseApi";

const userApi = {
  getListUser: () => {
    return apiConfig.get("http://localhost:3000/users");
  },
  getPaginatedUsers: (page, limit) => {
    return apiConfig.get(
      `http://localhost:3000/users?_page=${page}&_per_page=${limit}`
    );
  },
  deleteUser: (id) => {
    return apiConfig.delete(`http://localhost:3000/users/${id}`);
  },
  addUser: (newUser) => {
    return apiConfig.post("http://localhost:3000/users", newUser);
  },
  updateUser: (id, updatedUser) => {
    return apiConfig.put(`http://localhost:3000/users/${id}`, updatedUser);
  },
  getEmailExists: (email) => {
    return apiConfig.get(`http://localhost:3000/users?email=${email}`);
  },
  
  // Hàm login
  login: (email, password) => {
    return apiConfig.post("http://localhost:3000/login", { email, password });
  },
};

export default userApi;
