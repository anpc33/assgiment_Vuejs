import { createRouter, createWebHistory } from "vue-router";
import dashboard from "../components/Dashboard.vue";
import listProducts from "../components/Products/listProducts.vue";
import listUser from "../components/Uesr/listUser.vue";
import createUser from "../components/Uesr/addUser.vue";
import updateUser from "../components/Uesr/updateUser.vue";
import listCategory from "../components/Category/listCategory.vue";
import addCategory from "../components/Category/addCategory.vue";
import updateCategory from "../components/Category/updateCategory.vue";
import addProducts from "../components/Products/addProducts.vue";
import updateProducts from "../components/Products/updateProducts.vue";
import listOrder from "../components/Order/listOrder.vue";
import updateOrder from "../components/Order/updateOrder.vue";
import login from "../components/Login_Reg/login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // User
    {
      path: "/listUser",
      name: "listUser",
      component: listUser,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
    },
    {
      path: "/create",
      name: "create",
      component: createUser,
    },
    {
      path: "/updateUser/:id",
      name: "updateUser",
      component: updateUser,
    },
    /// Category
    {
      path: "/listCategory",
      name: "listCategory",
      component: listCategory,
    },
    {
      path: "/addCategory",
      name: "addCategory",
      component: addCategory,
    },
    
    {
      path: "/updateCategory/:id",
      name: "updateCategory",
      component: updateCategory,
    },
    // products
    {
      path: "/listProducts",
      name: "listProducts",
      component: listProducts,
    },
     {
      path: "/addProducts",
      name: "addProducts",
      component: addProducts,
    },
    {
      path: "/updateProducts/:id",
      name: "updateProducts",
      component: updateProducts,
    },
    // order 
    {
      path: "/listOrder",
      name: "listOrder",
      component: listOrder,
    },
    {
      path: "/updateOrder/:id",
      name: "updateOrder",
      component: updateOrder,
    },
    // login
    {
      path: "/login",
      name: "login",
      component: login,
    },

  ],
});

export default router;
