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
        <NuxtLink to="/user/sewa" class="text-white hover:underline font-bold"
          >Rent</NuxtLink>
        <NuxtLink to="/user/laporan/penghuni" class="text-white hover:underline font-bold"
          >Report Penghuni</NuxtLink
        >
        <NuxtLink to="/user/laporan/fasilitas" class="text-white hover:underline font-bold"
          >Report Fasilitas</NuxtLink
        >
        <div
          class="w-8 h-8 bg-red-500 rounded-full cursor-pointer"
          @click="logout"
        >
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
        class="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 w-full max-w-4xl"
      >
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Invoice History</h2>
        <table
          class="table-auto w-full text-left text-gray-800 border-collapse"
        >
          <thead>
            <tr class="border-b-2 border-gray-400">
              <th class="px-4 py-2 font-semibold">Tanggal</th>
              <th class="px-4 py-2 font-semibold">Tagihan</th>
              <th class="px-4 py-2 font-semibold">Status</th>
              <th class="px-4 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(invoice, index) in inv_history"
              :key="index"
              class="border-b"
            >
              <td class="px-4 py-2">{{ formatDate(invoice["createdAt"]) }}</td>
              <td class="px-4 py-2">{{ formatCurrency(invoice["bill"]) }}</td>
              <td class="px-4 py-2">
                <span
                  :class="
                    invoice['status'] === 'Paid'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  class="font-semibold"
                >
                  {{ invoice["status"] }}
                </span>
              </td>
              <td>
                <button @click=updateStatus(invoice.invoice_id) v-if="invoice['status'] === 'Pending'" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Confirm
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  requiresUser: true,
});

let username = ref<string | null>(null);
let token = ref<string | null>(null);
let userId = ref<string | null>(null);

const inv_history = ref([]);

const backgroundImage = "/images/bgbed2.jpg";

const updateStatus = async(invoice_id: String): Promise<void> =>{
  try {
    const response = await fetch(
      `http://localhost:3001/user/sewa/invoices/update/${invoice_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          status: "Paid",
        }),
      }
    );
    if (!response.ok) {
      return response.json().then((errorData) => {
        alert(`Error updating data: ${errorData.message}`);
        throw new Error("Failed to update invoice history");
      });
    }
    // get room
    const room = await fetch(
      `http://localhost:3001/user/room`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    const roomData = await room.json();
    const filled = roomData.data[0].filled;

    // update room 
    const updateRoom = await fetch(
      `http://localhost:3001/user/room/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          empty: 10- parseInt(filled) -1,
          filled: parseInt(filled)+1,
        }),
      }
    );

    if(!updateRoom.ok){
      return updateRoom.json().then((errorData) => {
        alert(`Error updating data: ${errorData.message}`);
        throw new Error("Failed to update room");
      });
    }
    alert("Invoice status updated successfully");
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

const getUserData = async (userId: String): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3001/user/detail/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
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
    inv_history.value = data.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  if (process.client) {
    const userRole = localStorage.getItem("role");
    username.value = localStorage.getItem("username");
    token.value = localStorage.getItem("token");
    userId.value = localStorage.getItem("userId");
    if (userRole !== "USER") {
      navigateTo("/");
    }
  }
  if (userId.value) {
    getUserData(userId.value);
  }
});

const router = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  router.push("/");
};

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}
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
