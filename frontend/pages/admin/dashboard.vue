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
        >Dashboard</NuxtLink>
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

    <!-- Welcome Section -->
    <div
      class="relative z-10 flex-grow flex flex-col justify-center items-center text-white px-6"
    >
      <h1 class="text-5xl font-bold mb-4">Welcome, {{ username }}</h1>
      <div
        class="bg-white bg-opacity-80 rounded-lg shadow-lg p-12 w-full max-w-4xl"
      >
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Room Occupancy</h2>
        <div
          class="grid grid-cols-5 gap-5 w-full text-white text-center border-collapse"
        >
          <div v-for="n in 10" class="py-5 rounded-xl font-bold" :class="n <= filledRoom ? 'bg-red-500' : 'bg-green-500'">
                <h1>Kamar {{ n }}</h1>
          </div>
        </div>
        
        <h2 class="text-2xl font-bold mt-12 mb-6 text-gray-800">List Penghuni</h2>
        <table class="table-auto w-full text-left text-gray-800 border-collapse">
            <thead>
              <tr class="border-b-2 border-gray-400">
                <th class="px-4 py-2 font-semibold">Username</th>
                <th class="px-4 py-2 font-semibold">Password</th>
                <!-- <th class="px-4 py-2 font-semibold">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in user" :key="index" class="border-b">
                <td class="px-4 py-2 font-semibold">{{ item["username"] }}</td>
                <td class="px-4 py-2">{{ item["password"] }}</td>
                <!-- <td class="space-x-1">
                    <button class="bg-blue-500 text-white font-bold py-1 px-4 rounded-md">
                        Detail
                    </button>
                    <button class="bg-red-500 text-white font-bold py-1 px-4 rounded-md">
                        Remove
                    </button>
                </td> -->
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

const filledRoom = ref();
const user = ref([])
let username = ref<string | null>(null);
let token = ref<string | null>(null);

const getRoomOccupancy = async () => {
  try {
    const response = await fetch("http://localhost:3001/admin/", 
    {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token.value}`,
        },
    });
    if (!response.ok) {
      return response.json().then((errorData) => {
        console.error("Error fetching data:", errorData.message);
        alert(`Error fetching data: ${errorData.message}`);
        throw new Error("Failed to fetch room occupancy data");
      });
    }
    const data = await response.json();
    filledRoom.value = data.data[0].filled;
  } catch (error) {
    console.error(error);
  }
};

const getPenghuni = async() => {
    try{
        const response = await fetch("http://localhost:3001/admin/user",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.value}`, // Include the token in the Authorization header
            },
        });
        if (!response.ok) {
            return response.json().then((errorData) => {
                alert(`Error fetching data: ${errorData.message}`);
                throw new Error("Failed to fetch data penghuni");
            });
        }
        const data = await response.json();
        user.value = data.data;
    }catch(error){
        console.error(error)
    }
}

const router = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  router.push("/");
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
  getRoomOccupancy();
  getPenghuni();
});
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
