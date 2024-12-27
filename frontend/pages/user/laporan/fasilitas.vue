<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <nav class="bg-gray-800 shadow-md py-4 px-8 flex justify-between items-center text-white">
        <div class="text-2xl font-bold">kostFP04</div>
        <NuxtLink to="/user" class="hover:underline">Dashboard</NuxtLink>
      </nav>
      <div class="container mx-auto px-6 py-10">
        <h1 class="text-3xl font-semibold mb-6 text-gray-800">Laporan Fasilitas</h1>
        <form @submit.prevent="submitReport" class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Deskripsi Kerusakan:</label>
            <textarea
              v-model="facilityReport"
              rows="5"
              placeholder="Deskripsikan kerusakan fasilitas..."
              class="w-full p-2 border rounded"
            ></textarea>
          </div>
          <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    middleware: "auth",
    requiresUser: true,
  });
  
  import { ref } from "vue";
  
  const facilityReport = ref("");
  
  const submitReport = async () => {
    if (!facilityReport.value.trim()) {
      alert("Deskripsi kerusakan tidak boleh kosong!");
      return;
    }
  
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!token || !userId) {
      alert("User not authenticated. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/user/laporan/fasilitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          message: facilityReport.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send the report. Please try again.");
      }
  
      alert("Laporan berhasil dikirim!");
      facilityReport.value = "";
    } catch (error) {
      console.error("Error submitting the report:", error);
      alert("Terjadi kesalahan saat mengirim laporan.");
    }
  };
  </script>
  