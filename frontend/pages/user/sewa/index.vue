<template>
    <div class="min-h-screen bg-cover bg-center flex flex-col" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <!-- Navbar -->
      <nav class="py-4 px-8 flex justify-between items-center shadow-md" :style="{ backgroundColor: '#D3A78C' }">
        <div class="text-2xl font-bold text-white">kostFP04</div>
        <NuxtLink to="/user" class="text-white hover:underline">Dashboard</NuxtLink>
      </nav>
  
      <!-- Spesifikasi Kamar -->
      <div class="container mx-auto px-6 py-10">
        <h1 class="text-3xl font-semibold mb-6 text-gray-800 text-center">Sewa Kamar</h1>
        <div class="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Spesifikasi Kamar</h2>
          <ul class="list-disc pl-6 text-gray-700">
            <li>Luas kamar: 4x5</li>
            <li>Kamar mandi dalam</li>
            <li>Kasur ukuran queen</li>
            <li>Kursi dan meja belajar</li>
            <li>TV dan AC</li>
          </ul>
        </div>
  
        <!-- Form Pilihan Sewa -->
        <div class="bg-white bg-opacity-80 rounded-lg shadow-lg p-6 mt-8">
          <h2 class="text-2xl font-bold mb-4">Pilih Periode Sewa dan Fasilitas Tambahan</h2>
          <form @submit.prevent="goToPayment">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Periode Sewa:</label>
              <select v-model="selectedPeriod" class="w-full p-2 border rounded">
                <option value="3">3 Bulan</option>
                <option value="6">6 Bulan</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Fasilitas Tambahan:</label>
              <div>
                <label class="inline-flex items-center">
                  <input type="checkbox" value="Laundry" v-model="extras" />
                  <span class="ml-2">Laundry</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input type="checkbox" value="Cleaning Service" v-model="extras" />
                  <span class="ml-2">Cleaning Service</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center">
                  <input type="checkbox" value="Catering" v-model="extras" />
                  <span class="ml-2">Catering</span>
                </label>
              </div>
            </div>
            <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Lanjutkan ke Pembayaran</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const selectedPeriod = ref("3");
  const extras = ref([]);
  const backgroundImage = "https://example.com/path/to/your/background-image.jpg";
  
  const goToPayment = () => {
    router.push({
      path: "/user/sewa/bayar",
      query: { 
        period: selectedPeriod.value, 
        extras: extras.value.join(",") 
      },
    }).catch((err) => {
      console.error("Navigation error:", err);
    });
  };
  </script>
  
  