<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import userApi from "@/service/userApi/userApi";

// Declare reactive variables
const email = ref("");
const password = ref("");
const router = useRouter();

// Function to toggle password visibility
const togglePassword = () => {
  const passwordField = document.getElementById("password");
  const type = passwordField.type === "password" ? "text" : "password";
  passwordField.type = type;
};

// Handle form submission and login
const handleLogin = async () => {
  try {
    // Call the API to authenticate the user
    const response = await userApi.getEmailExists(email.value);
    const users = response.data;

    // console.log(users);

    // Check if the user exists and password is correct
    const user = users.find(
      (user) => user.email == email.value && user.password == password.value
    );

    if (user) {
      // Save user info to localStorage for persistent login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email.value);
      localStorage.setItem("userRole", user.role);

      // Kích hoạt sự kiện để các trang khác nhận biết thay đổi
      window.dispatchEvent(new Event("storage"));

      // Check user role and redirect accordingly
      if (user.role == 1) {
        // Redirect to admin dashboard
        router.push({ name: "dashboard" });
      } else {
        // Redirect to customer page
        alert("Bạn không có quyền truy cập.");
      }
    } else {
      // Show an alert if credentials are incorrect
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
};
</script>


<template>
  <div class="font-sans text-gray-900 antialiased">
    <div
      class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]"
    >
      <div>
        <a href="/">
          <h2 class="font-bold text-3xl">
            AN<span class="bg-[#f84525] text-white px-2 rounded-md"
              >PH51578</span
            >
          </h2>
        </a>
      </div>

      <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
      >
        <form @submit.prevent="handleLogin">
          <div class="py-8">
            <center>
              <span class="text-2xl font-semibold">Log In</span>
            </center>
          </div>

          <div>
            <label class="block font-medium text-sm text-gray-700" for="email"
              >Email</label
            >
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              placeholder="Email"
              required
              autocomplete="email"
            />
          </div>

          <div class="mt-4">
            <label
              class="block font-medium text-sm text-gray-700"
              for="password"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="password"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                autocomplete="current-password"
                class="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
              <div
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <button
                  type="button"
                  id="togglePassword"
                  class="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                  @click="togglePassword"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                    style="fill: rgba(0, 0, 0, 1); transform: msFilter"
                  >
                    <path
                      d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="block mt-4">
            <label for="remember_me" class="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <span class="ms-2 text-sm text-gray-600">Remember Me</span>
            </label>
          </div>

          <div class="flex items-center justify-end mt-4">
            <a
              class="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              href="index.php?act=forgotpass"
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              class="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
              Login
            </button>
          </div>

          <div class="flex items-center justify-end mt-4">
            <p class="mt-12 text-xs text-center font-light text-gray-400">
              Don't have an account?
              <a href="index.php?act=register" class="text-black font-medium">
                Create One
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
