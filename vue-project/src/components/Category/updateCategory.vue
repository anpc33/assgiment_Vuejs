<script>
import CategoryApi from "@/service/categoryApi/cateApi";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const updateCategory = ref({
      name: "",
      description: "",
    });

    const router = useRouter();
    const route = useRoute();
    const categoryId = route.params.id;

    // Lấy thông tin danh mục từ API khi component được mount
    const getCategoryDetails = async () => {
      try {
        // Gọi API để lấy danh sách danh mục
        const response = await CategoryApi.getListCategory();
        const category = response.data.find((u) => u.id === categoryId);
        
        // Nếu tìm thấy danh mục, cập nhật vào form
        if (category) {
          updateCategory.value.name = category.name;
          updateCategory.value.description = category.description;
        } else {
          alert("Không tìm thấy danh mục.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin danh mục:", error);
        alert("Không thể lấy thông tin danh mục.");
      }
    };

    // Gọi hàm lấy thông tin danh mục khi component mounted
    onMounted(() => {
      getCategoryDetails();
    });

    // Xử lý sự kiện submit form
    const handleSubmit = async () => {
      try {
        // Cập nhật danh mục thông qua API
        await CategoryApi.updateCategory(categoryId, updateCategory.value);
        alert("Cập nhật thành công!");
        router.push("/listCategory");
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        alert("Đã xảy ra lỗi khi cập nhật");
      }
    };

    return {
      updateCategory,
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
            >Tên</label
          >
          <input
            type="text"
            id="name"
            v-model="updateCategory.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium"
            style="color: black"
            >Mô tả</label
          >
          <input
            type="text"
            id="description"
            v-model="updateCategory.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
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
