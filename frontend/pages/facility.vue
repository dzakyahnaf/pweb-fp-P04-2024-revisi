<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center py-12"
    :style="{ backgroundImage: `url(${backgroundUrl})` }"
  >
    <!-- Title -->
    <h1 class="text-3xl font-bold mb-6 text-white bg-opacity-80 px-6 py-2 rounded">
      Fasilitas Kost
    </h1>

    <!-- Carousel Container -->
    <div class="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-white bg-opacity-90">
      <!-- Slides -->
      <div
        class="flex transition-transform duration-500"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <!-- Slide 1: Spesifikasi Kamar -->
        <div class="w-full flex-shrink-0 p-6 text-gray-700">
          <div
            class="h-60 bg-cover bg-center rounded-md"
            :style="{ backgroundImage: `url(${slideImages[0]})` }"
          ></div>
          <h2 class="text-2xl font-semibold mt-4 mb-2">Spesifikasi Kamar</h2>
          <ul class="list-disc pl-5">
            <li>Luas kamar: 4x5</li>
            <li>Kasur tidur ukuran queen</li>
            <li>Kamar mandi dalam</li>
            <li>Kursi dan meja belajar</li>
          </ul>
        </div>

        <!-- Slide 2: Pilihan Sewa -->
        <div class="w-full flex-shrink-0 p-6 text-gray-700">
          <div
            class="h-60 bg-cover bg-center rounded-md"
            :style="{ backgroundImage: `url(${slideImages[1]})` }"
          ></div>
          <h2 class="text-2xl font-semibold mt-4 mb-2">Pilihan Sewa</h2>
          <ul class="list-disc pl-5">
            <li>3 Bulan</li>
            <li>6 Bulan</li>
          </ul>
        </div>

        <!-- Slide 3: Fasilitas Tambahan Berbayar -->
        <div class="w-full flex-shrink-0 p-6 text-gray-700">
          <div
            class="h-60 bg-cover bg-center rounded-md"
            :style="{ backgroundImage: `url(${slideImages[2]})` }"
          ></div>
          <h2 class="text-2xl font-semibold mt-4 mb-2">Fasilitas Tambahan Berbayar</h2>
          <ul class="list-disc pl-5">
            <li>Laundry</li>
            <li>Cleaning Service</li>
            <li>Catering</li>
          </ul>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
      >
        &#8592;
      </button>
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
      >
        &#8594;
      </button>
    </div>

    <!-- Indicators -->
    <div class="flex justify-center mt-4">
      <span
        v-for="(slide, index) in slideImages"
        :key="index"
        @click="goToSlide(index)"
        class="h-3 w-3 mx-1 rounded-full cursor-pointer"
        :class="currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      backgroundUrl:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      slideImages: [
        "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1179490/pexels-photo-1179490.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2927523/pexels-photo-2927523.jpeg?auto=compress&cs=tinysrgb&w=800",
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slideImages.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.slideImages.length) % this.slideImages.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
  },
};
</script>


