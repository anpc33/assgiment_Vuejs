<script>
import ProductsApi from "@/service/productsApi/productsApi";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const updatedProducts = ref({
      name: "",
      price: "",
      img: "",
      quantity: "",
      description: "",
      categoryId: "",
    });

    const router = useRouter();
    const route = useRoute();
    const productId = route.params.id;

    // Lấy thông tin danh mục từ API khi component được mount
    const getProductsDetails = async () => {
      try {
        // Gọi API để lấy danh sách danh mục
        const response = await ProductsApi.getListProducts();
        const products = response.data.find((u) => u.id === productId);

        // Nếu tìm thấy danh mục, cập nhật vào form
        if (products) {
          updatedProducts.value.name = products.name;
          updatedProducts.value.price = products.price;
          updatedProducts.value.img = products.img;
          updatedProducts.value.quantity = products.quantity;
          updatedProducts.value.categoryId = products.categoryId;
          updatedProducts.value.description = products.description;
        } else {
          alert("Không tìm thấy sản phẩm.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin :", error);
        alert("Không thể lấy thông tin .");
      }
    };
    
    // Gọi hàm lấy thông tin danh mục khi component mounted
    onMounted(() => {
      getProductsDetails();
    });

    // Xử lý sự kiện submit form
    const handleSubmit = async () => {
      try {
        // Cập nhật danh mục thông qua API
        await ProductsApi.updateProducts(productId, updatedProducts.value);
        alert("Cập nhật thành công!");
        router.push("/listProducts");
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        alert("Đã xảy ra lỗi khi cập nhật");
      }
    };

    return {
      updatedProducts,
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
            v-model="updatedProducts.name"
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
            v-model="updatedProducts.price"
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
            v-model="updatedProducts.description"
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
            v-model="updatedProducts.quantity"
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
            v-model="updatedProducts.img"
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
            v-model="updatedProducts.categoryId"
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
        Sửa
      </button>
    </form>
  </div>
</template>
