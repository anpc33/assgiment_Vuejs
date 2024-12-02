<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import userApi from "@/service/userApi/userApi";

export default {
  setup() {
    const updatedUser = ref({
      name: "",
      date: "",
      address: "",
      email: "",
    });

    const router = useRouter();
    const route = useRoute();
    const currentEmail = ref(""); // Để lưu email của người dùng hiện tại

    // Kiểm tra định dạng email hợp lệ
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

    // Kiểm tra email có trùng trong cơ sở dữ liệu không
    const checkEmailExists = async (email) => {
      try {
        const response = await userApi.getListUser(); // Giả sử lấy tất cả người dùng
        return response.data.some((user) => user.email === email); // Kiểm tra nếu email đã tồn tại
      } catch (error) {
        console.error("Lỗi khi kiểm tra email:", error);
        return false;
      }
    };

    // Xử lý sự kiện submit form
    const handleSubmit = async () => {
      // Kiểm tra email hợp lệ
      if (!validateEmail(updatedUser.value.email)) {
        alert("Email không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      // Kiểm tra email trùng lặp trong DB
      const isEmailExists = await checkEmailExists(updatedUser.value.email);

      if (isEmailExists && updatedUser.value.email !== currentEmail.value) {
        alert("Email này đã tồn tại. Vui lòng chọn email khác.");
        return;
      }

      try {
        // Cập nhật người dùng thông qua API
        await userApi.updateUser(route.params.id, updatedUser.value);
        alert("Cập nhật người dùng thành công!");
        router.push("/listUser");
        
      } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        alert("Đã xảy ra lỗi khi cập nhật người dùng.");
      }
    };

    // Lấy ID người dùng từ URL
    const userId = route.params.id;

    // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
    const convertDateFormat = (date) => {
      if (!date) return "";
      const parts = date.split("/");
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return date; // Nếu đã là định dạng YYYY-MM-DD
    };

    // Lấy thông tin người dùng từ API khi component được mount
    const getUserDetails = async () => {
      try {
        const response = await userApi.getListUser();
        const user = response.data.find((u) => u.id === userId);
        if (user) {
          updatedUser.value = {
            ...user,
            date: convertDateFormat(user.date), // Chuyển đổi định dạng ngày
          };
          currentEmail.value = user.email; // Lưu email hiện tại
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Không thể lấy thông tin người dùng.");
      }
    };

    // Gọi hàm lấy thông tin người dùng khi component mounted
    onMounted(() => {
      getUserDetails();
    });

    return {
      updatedUser,
      handleSubmit,
      validateEmail,
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
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="updatedUser.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
          />
        </div>

        <div>
          <label
            for="date"
            class="block mb-2 text-sm font-medium"
            style="color: black"
            >Ngày sinh</label
          >
          <input
            type="date"
            id="date"
            v-model="updatedUser.date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            for="address"
            class="block mb-2 text-sm font-medium"
            style="color: black"
            >Địa chỉ</label
          >
          <input
            type="text"
            id="address"
            v-model="updatedUser.address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium"
            style="color: black"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="updatedUser.email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <div
            v-if="!validateEmail(updatedUser.email) && updatedUser.email !== ''"
            class="text-red-500 text-sm mt-1"
          >
            Vui lòng nhập email hợp lệ.
          </div>
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
