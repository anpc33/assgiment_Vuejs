<script>
import orderApi from "@/service/orderApi/orderApi";
import { ref, onMounted } from "vue";
import { formatPrice } from "@/components/formatPrice";
export default {
  setup() {
    const data = ref([]); // Lưu danh sách người dùng
    const currentPage = ref(1); // Trang hiện tại
    const limit = ref(5); // Số bản ghi mỗi trang
    const totalItems = ref(50); // Tổng số bản ghi

    // Hàm lấy dữ liệu phân trang
    const getData = async (page = 1) => {
      try {
        const response = await orderApi.getPaginatedorder(page, limit.value);
        data.value = response.data.data;
        currentPage.value = page;

        return data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const deleteorder = async (id) => {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa đơn hàng này không?"
      );
      if (confirmed) {
        try {
          await orderApi.deleteorder(id); // Gọi API xóa
          alert("Đơn hàng đã được xóa thành công!");
          getData();
        } catch (error) {
          console.error("Lỗi khi xóa đơn hàng:", error);
          alert("Đã xảy ra lỗi khi xóa đơn hàng.");
        }
      }
    };

    // Gọi hàm `getData` khi component được mounted
    onMounted(() => {
      getData();
    });

    return {
      data,
      currentPage,
      limit,
      totalItems,
      getData,
      deleteorder,
      formatPrice,
    };
  },
};
</script>

<template>
  <!-- component -->
  <div class="bg-white p-8 rounded-md w-full" style="min-height: 100vh">
    <div class="flex items-center justify-between pb-6">
      <div>
        <h2 class="text-gray-600 font-semibold">Order</h2>
        <span class="text-xs" style="color: black">All Order item</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex bg-gray-50 items-center p-2 rounded-md"></div>
        <div class="lg:ml-40 ml-10 space-x-8 mr-4">
        
        </div>
      </div>
    </div>
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <input type="checkbox" name="" id="" />
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Mã đơn hàng
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Ngày đặt hàng
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Trạng thái đơn hàng
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Phương Thức Thanh Toán
                </th>

                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Trạng Thái Thanh Toán
                </th>

                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Tổng tiền
                </th>

                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(orderItem, index) in data" :key="index">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input type="checkbox" name="" id="" />
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ orderItem.id }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ orderItem.date }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{
                      orderItem?.status == 0
                        ? "Chưa xác nhận"
                        : orderItem?.status == 1
                        ? "Đã xác nhận"
                        : orderItem?.status == 2
                        ? "Đang giao hàng"
                        : orderItem?.status == 3
                        ? "Đã giao"
                        : orderItem?.status == 4
                        ? "Đã hoàn thành"
                        : orderItem?.status == 5
                        ? "Đã hủy"
                        : "Chưa xác định"
                    }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{
                      orderItem?.payment == 0
                        ? "Thanh toán COD"
                        : orderItem?.payment == 1
                        ? "Thanh toán online VnPay"
                        : "Chưa xác định"
                    }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{
                      orderItem?.paymentStatus == 0
                        ? "Chưa thanh toán"
                        : orderItem?.paymentStatus == 1
                        ? "Đã thanh toán"
                        : "Chưa xác định"
                    }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ formatPrice(orderItem.total) }}
                  </p>
                </td>

                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex justify-center gap-3 items-center">
                    <div v-if="orderItem?.status === 5">
                      <button
                        @click="deleteorder(orderItem.id)"
                        class="btn btn-danger btn-sm"
                        style="color: red"
                      >
                        <svg
                          class="h-5 w-5 text-red-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path
                            d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                          />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </div>

                    <div>
                      <RouterLink
                        :to="`/updateOrder/${orderItem.id}`"
                        class="text-sm"
                      >
                        <svg
                          class="h-5 w-5 text-slate-500"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <path
                            d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                          />
                          <path
                            d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
                          />
                          <line x1="16" y1="5" x2="19" y2="8" />
                        </svg>
                      </RouterLink>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <!-- Phân trang -->
            <div
              class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
            >
              <span class="text-xs xs:text-sm text-gray-900">
                Showing {{ (currentPage - 1) * limit + 1 }} of
                {{ totalItems }}
                Entries
              </span>

              <div class="inline-flex mt-2 xs:mt-0">
                <button
                  @click="getData(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
                >
                  Prev
                </button>
                &nbsp; &nbsp;
                <button
                  @click="getData(currentPage + 1)"
                  :disabled="currentPage * limit >= totalItems"
                  class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
