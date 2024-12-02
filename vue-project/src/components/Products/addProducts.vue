<script>
import ProductsApi from "@/service/productsApi/productsApi";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const newProducts = ref({
      name: "",
      price: "",
      img: "",
      quantity: "",
      description: "",
      categoryId: "",
    });

    const router = useRouter();
    const route = useRoute();

    const handleSubmit = async () => {
      try {
        // Gọi API để thêm người dùng mới
        await ProductsApi.addProducts(newProducts.value);
        alert("Thêm thành công!");
        router.push("/listProducts");
        // Reset form
        newProducts.value = {
          name: "",
          price: "",
          img: "",
          quantity: "",
          description: "",
          categoryId: "",
        };
      } catch (error) {
        console.error("Lỗi khi thêm ", error);
        alert("Đã xảy ra lỗi khi thêm.");
      }
    };

    return {
      newProducts,
      handleSubmit,
    };
  },
};
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white p-16 mt-3" style="min-height: 100vh">
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            v-model="newProducts.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div>
          <label
            for="price"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Giá
          </label>
          <input
            type="number"
            id="price"
            v-model="newProducts.price"
            placeholder="Nhập giá"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Mô tả
          </label>
          <input
            type="text"
            id="description"
            v-model="newProducts.description"
            placeholder="Nhập mô tả"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Số lượng
          </label>
          <input
            type="number"
            id="quantity"
            v-model="newProducts.quantity"
            placeholder="Nhập số lượng"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            for="img"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Hình ảnh
          </label>
          <input
            type="text"
            id="img"
            v-model="newProducts.img"
            placeholder="Nhập link hình ảnh"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            for="categoryId"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Danh mục
          </label>
          <select
            id="categoryId"
            v-model="newProducts.categoryId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>Chọn danh mục</option>
            <option value="1">Áo</option>
            <option value="2">Quần</option>
          </select>
        </div>
      </div>


      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Thêm sản phẩm
      </button>
    </form>
  </div>
</template>
