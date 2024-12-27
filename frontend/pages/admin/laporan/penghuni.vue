<template>
  <div
    class="relative h-screen w-screen flex flex-col bg-cover bg-center"
    :style="{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0"
      :style="{
        backgroundColor: '#D3A78C',
        opacity: '0.4',
      }"
    ></div>

    <!-- Navbar -->
    <nav
      class="relative z-10 py-4 px-8 flex justify-between items-center shadow-md"
      :style="{ backgroundColor: '#D3A78C' }"
    >
      <div class="text-2xl font-bold text-white">kostFP04</div>
      <div class="flex space-x-8 items-center relative">
        <NuxtLink
          to="/admin/dashboard"
          class="text-white hover:underline font-bold tracking-wide"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/admin/laporan/penghuni"
          class="text-white hover:underline font-bold tracking-wide"
          >Penghuni Report</NuxtLink
        >
        <NuxtLink
          to="/admin/laporan/fasilitas"
          class="text-white hover:underline font-bold tracking-wide"
          >Facility Report
        </NuxtLink>

        <div class="w-8 h-8 bg-red-500 rounded-full cursor-pointer" @click="logout">
            <p class="text-center font-bold text-xl text-white">X</p>
        </div>
      </div>
    </nav>

    <div
      class="relative z-10 flex-grow flex flex-col justify-center items-center text-white px-6"
    >
      <div
        class="bg-white bg-opacity-80 rounded-lg shadow-lg p-12 w-full max-w-4xl"
      >
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Laporan Penghuni</h2>
        <table
          class="table-auto w-full text-left text-gray-800 border-collapse"
        >
          <thead>
            <tr class="border-b-2 border-gray-400">
              <th class="px-4 py-2 font-bold">Deskripsi Laporan</th>
              <th class="px-4 py-2 font-bold">Tanggal Submit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in report" :key="index" class="border-b">
              <td class="px-4 py-2 font-semibold">{{ item["message"] }}</td>
              <td class="px-4 py-2">{{ formatDate(item["createdAt"]) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  requiresAdmin: true,
});

const backgroundImage = "/images/bgbed2.jpg";

const report = ref([]);
let username = ref<string | null>(null);
let token = ref<string | null>(null);

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const getLaporan = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/admin/laporan/penghuni",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`, // Include the token in the Authorization header
        },
      }
    );
    if (!response.ok) {
      return response.json().then((errorData) => {
        alert(`Error fetching data: ${errorData.message}`);
        throw new Error("Failed to fetch data penghuni");
      });
    }
    const data = await response.json();
    report.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  if (process.client) {
    username.value = localStorage.getItem("username");
    token.value = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (userRole !== "ADMIN") {
      navigateTo("/");
    }
  }
  getLaporan();
});

const router = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  router.push("/");
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

nav {
  background-color: #d3a78c;
}

.group:hover .group-hover\:flex {
  display: flex;
}
</style>
