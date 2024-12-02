<script>
import orderApi from "@/service/orderApi/orderApi";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatPrice } from "@/components/formatPrice";

export default {
  setup() {
    const updatedorder = ref({
      date: "",
      payment: "",
      paymentStatus: "",
      status: "",
      total: "",
    });

    const router = useRouter();
    const route = useRoute();
    const orderIds = route.params.id;

    // Lấy thông tin danh mục từ API khi component được mount
    const getOrderDetails = async () => {
      try {
        // Gọi API để lấy danh sách danh mục
        const response = await orderApi.getListorder();
        const orderId = response.data.find((u) => u.id === orderIds);

        if (orderId) {
          updatedorder.value.date = orderId.date;
          updatedorder.value.id = orderId.id;
          updatedorder.value.payment = orderId.payment;
          updatedorder.value.paymentStatus = orderId.paymentStatus;
          updatedorder.value.status = orderId.status;
          updatedorder.value.total = orderId.total;
        } else {
          alert("Không tìm thấy đơn hàng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin :", error);
        alert("Không thể lấy thông tin .");
      }
    };

    // Gọi hàm lấy thông tin danh mục khi component mounted
    onMounted(() => {
      getOrderDetails();
    });

    // Xử lý sự kiện submit form
    const handleSubmit = async () => {
      try {
        // Cập nhật danh mục thông qua API
        await orderApi.updateorder(orderIds, updatedorder.value);
        alert("Cập nhật thành công!");
        router.push("/listOrder");
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        alert("Đã xảy ra lỗi khi cập nhật");
      }
    };

    return {
      updatedorder,
      handleSubmit,
      formatPrice,
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
            for=""
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Mã đơn hàng
          </label>
          <input
            type="number"
            id="id"
            v-model="updatedorder.id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nhập tên"
            required
            readonly
          />
        </div>

        <div>
          <label
            for=""
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Ngày đặt hàng
          </label>
          <input
            type="text"
            id="date"
            v-model="updatedorder.date"
            placeholder="Nhập giá"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            readonly
          />
        </div>

        <div>
          <label
            for="status"
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Trạng thái đơn hàng
          </label>
          <select
            id="status"
            v-model="updatedorder.status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="0">Chưa xác nhận</option>
            <option value="1">Đã xác nhận</option>
            <option value="2">Đang giao hàng</option>
            <option value="3">Đã giao</option>
            <option value="4">Đã hoàn thành</option>
            <option value="5">Đã hủy</option>
          </select>
        </div>

        <div>
          <label
            for=""
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Phương thức thanh toán
          </label>
          <select
            id=""
            v-model="updatedorder.payment"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            disabled
          >
            <option value="0">Thanh toán COD</option>
            <option value="1">Thanh toán online VnPay</option>
          </select>
        </div>

        <div>
          <label
            for=""
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Trạng thái thanh toán
          </label>
          <select
            id=""
            v-model="updatedorder.payment"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            disabled
          >
            <option value="0">Chưa thanh toán</option>
            <option value="1">Đã thanh toán</option>
          </select>
        </div>

        <div>
          <label
            for=""
            class="block mb-2 text-sm font-medium"
            style="color: black"
          >
            Tổng tiền
          </label>
          <input
            type="number"
            id="total"
            v-model="updatedorder.total"
            placeholder="Nhập giá"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            readonly
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
