<script>
import CategoryApi from "@/service/categoryApi/cateApi";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const newCategory = ref({
      name: "",
      description: "",
    });

    const router = useRouter();
    const route = useRoute();

    const handleSubmit = async () => {
      try {
        // Gọi API để thêm người dùng mới
        await CategoryApi.addCategory(newCategory.value);
        alert("Thêm thành công!");
        router.push("/listCategory");
        // Reset form
        newCategory.value = {
          name: "",
          description: "",
         
        };
      } catch (error) {
        console.error("Lỗi khi thêm ", error);
        alert("Đã xảy ra lỗi khi thêm.");
      }
    };

    return {
      newCategory,
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
          <label for="name" class="block mb-2 text-sm font-medium" style="color: black">
            Tên danh mục
          </label>
          <input
            type="text"
            id="name"
            v-model="newCategory.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div>
          <label for="date" class="block mb-2 text-sm font-medium" style="color: black">
           Mô tả
          </label>
          <input
            type="text"
            id="description"
            v-model="newCategory.description"
             placeholder="Nhập mô tả"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Thêm danh mục
      </button>
    </form>
  </div>
</template>
