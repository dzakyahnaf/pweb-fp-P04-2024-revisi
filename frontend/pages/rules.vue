<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Judul -->
    <div class="text-center mt-8">
      <h1 class="text-4xl font-bold text-white bg-black bg-opacity-50 rounded-lg inline-block px-6 py-2">
        Peraturan Kost
      </h1>
    </div>

    <!-- Container untuk Peraturan -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      <!-- Container 1 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/17164/17164818.png"
          alt="Icon 1"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Dilarang Mengganggu Ketenangan</h2>
        <p class="text-gray-600 text-center">
          Karena mengganggu ketenangan penghuni lain dapat menyebabkan ketidaknyamanan bersama.
        </p>
      </div>

      <!-- Container 2 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/1970/1970829.png"
          alt="Icon 2"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Dilarang Membawa Hewan Peliharaan</h2>
        <p class="text-gray-600 text-center">
          Hewan peliharaan dilarang untuk menjaga kebersihan dan kesehatan lingkungan kost.
        </p>
      </div>

      <!-- Container 3 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3020/3020101.png"
          alt="Icon 3"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Dilarang Merokok di Dalam Kamar</h2>
        <p class="text-gray-600 text-center">
          Merokok di dalam kamar dapat merusak kebersihan dan kenyamanan ruangan.
        </p>
      </div>

      <!-- Container 4 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/15618/15618053.png"
          alt="Icon 4"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Dilarang Membuat Kegaduhan</h2>
        <p class="text-gray-600 text-center">
          Menghindari suara berlebihan untuk menjaga kenyamanan penghuni kost lainnya.
        </p>
      </div>

      <!-- Container 5 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3113/3113389.png"
          alt="Icon 5"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Dilarang Membawa Tamu Menginap</h2>
        <p class="text-gray-600 text-center">
          Tamu menginap dilarang demi menjaga privasi dan keamanan penghuni kost.
        </p>
      </div>

      <!-- Container 6 -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/2954/2954870.png"
          alt="Icon 6"
          class="w-16 h-16 mb-4 mx-auto"
        />
        <h2 class="text-xl font-semibold text-gray-800 text-center mb-2">Wajib Menjaga Kebersihan</h2>
        <p class="text-gray-600 text-center">
          Kebersihan adalah tanggung jawab bersama untuk kenyamanan hidup di lingkungan kost.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage:
        "https://images.pexels.com/photos/19813733/pexels-photo-19813733/free-photo-of-scrabble-letters-spelling-the-word-regulation.jpeg?auto=compress&cs=tinysrgb&w=800",
    };
  },
};
</script>


