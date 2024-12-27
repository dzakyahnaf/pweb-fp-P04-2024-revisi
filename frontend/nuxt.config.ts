import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  runtimeConfig:{
    public:{
      apiBase : "http://localhost:3001"
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  pages: true,
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
