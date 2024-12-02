<script>
import userApi from "@/service/userApi/userApi";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const newUser = ref({
      name: "",
      date: "",
      address: "",
      email: "",
      password: "",
      role: "",
    });
    const emailError = ref(""); // Lưu trạng thái lỗi email
    const router = useRouter();
    const route = useRoute();

    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

    const handleSubmit = async () => {
      // Kiểm tra email trước khi gửi
      if (!validateEmail(newUser.value.email)) {
        emailError.value = "Email không hợp lệ. Vui lòng nhập đúng định dạng.";
        return;
      }
      emailError.value = ""; // Xóa lỗi nếu email hợp lệ

      try {
        // Gọi API để thêm người dùng mới
        await userApi.addUser(newUser.value);
        alert("Thêm người dùng thành công!");
        router.push("/listUser");
        // Reset form
        newUser.value = {
          name: "",
          date: "",
          address: "",
          email: "",
          password: "",
          role: "",
        };
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        alert("Đã xảy ra lỗi khi thêm người dùng.");
      }
    };

    return {
      newUser,
      handleSubmit,
      validateEmail,
      emailError,
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
            Name
          </label>
          <input
            type="text"
            id="name"
            v-model="newUser.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div>
          <label for="date" class="block mb-2 text-sm font-medium" style="color: black">
            Ngày sinh
          </label>
          <input
            type="date"
            id="date"
            v-model="newUser.date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label for="address" class="block mb-2 text-sm font-medium" style="color: black">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            v-model="newUser.address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <div>
          <label for="address" class="block mb-2 text-sm font-medium" style="color: black">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            v-model="newUser.password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>

        <div>
          <label
            for="categoryId"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Phân quyền
          </label>
          <select
            id="categoryId"
            v-model="newUser.role"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>Chọn phần quyền</option>
            <option value="1">Admin</option>
            <option value="0">Client</option>
          </select>
        </div>


        <div>
          <label for="email" class="block mb-2 text-sm font-medium" style="color: black">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="newUser.email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ancqph51578@gmail.com"
            :class="emailError ? 'border-red-500' : ''"
            required
          />
          <!-- Hiển thị lỗi email -->
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Thêm người dùng
      </button>
    </form>
  </div>
</template>
