import apiConfig from "../baseApi";

const ProductsApi = {
  getListProducts: () => {
    return apiConfig.get("http://localhost:3000/products");
  },
  getPaginatedproducts: (page,limit) => {
    return apiConfig.get(
      `http://localhost:3000/products?_page=${page}&_per_page=${limit}`
    );
  },
  deleteProducts: (id) => {
    return apiConfig.delete(`http://localhost:3000/products/${id}`);
  },
  addProducts: (newProducts) => {
    return apiConfig.post("http://localhost:3000/products", newProducts);
  },
  updateProducts: (id, updatedProducts) => {
    return apiConfig.put(`http://localhost:3000/products/${id}`, updatedProducts);
  },
  getEmailExists: (email) => {
    return apiConfig.get(`http://localhost:3000/products?email=${email}`);
  },
};

export default ProductsApi;
