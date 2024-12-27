<template>
    <div class="min-h-screen bg-cover bg-center flex flex-col" :style="{ backgroundImage: `url(${backgroundImage})` }">
      
      <nav class="py-4 px-8 flex justify-between items-center shadow-md" :style="{ backgroundColor: '#D3A78C' }">
        <div class="text-2xl font-bold text-white">kostFP04</div>
        <NuxtLink to="/user/sewa" class="text-white hover:underline">Kembali</NuxtLink>
      </nav>
  
      <div class="container mx-auto px-6 py-10 w-2/4">
        <h1 class="text-3xl font-semibold mb-6 text-gray-800 text-center">Pembayaran</h1>
        <div class="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Total Biaya:</label>
            <p class="text-lg font-bold">{{ formatCurrency(totalBill) }}</p>
          </div>
          <form @submit.prevent="submitPayment">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Metode Pembayaran:</label>
              <select v-model="paymentMethod" class="w-full p-2 border rounded">
                <option value="QRIS">QRIS</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div v-if="paymentMethod === 'Bank Transfer'" class="mb-4">
              <label class="block text-gray-700 mb-2">Nama Bank:</label>
              <input type="text" v-model="bankName" class="w-full p-2 border rounded" placeholder="Mandiri" />
            </div>
            <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Konfirmasi</button>
          </form>
        </div>
      </div>
      <div v-if="showInvoice" class=" container mx-auto px-6 pt-3 pb-10 w-2/4">
        <div class="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
          <p class="text-2xl text-green-700 pb-5 font-bold">Invoice Pembelian</p>
          <p><strong>Invoice ID:</strong> {{ paymentId }}</p>
          <br>
          <p class="text-lg text-green-700 pb-1 font-bold">Description</p>
          <p><strong>Rent period :</strong> {{ rentPeriod }} months</p>
          <p class="font-bold">Facility: </p>
          <ul class="list-disc pl-6 text-gray-700">
            <li v-for="i in facility">{{ i }}</li>
          </ul>
          <!-- <p v-for="i in facility"><strong>{{ i }} :</strong> </p> -->
          <br>
          <p><strong>Total Bill:</strong> {{ formatCurrency(totalBill) }}</p>
          <p><strong>Payment Method:</strong> {{ paymentMethod }}</p>
        <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" @click="generatePDF">
          Download Invoice
        </button>
      </div>

      </div>
    </div>
  </template>
  
  <script setup lang = "ts">
  definePageMeta({
    requiresUser: true,
  });

  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import jsPDF from 'jspdf';

  const showInvoice = ref(false);

  const token = ref('');
  const userId = ref('');
  
  const paymentMethod = ref('QRIS');
  const paymentId = ref('');
  const bankName = ref('');
  const totalBill = ref(0);
  const rentPeriod = ref(3);
  const facility = ref<string[]>([]);
  
  const backgroundImage = ref('https://example.com/path/to/your/background-image.jpg');

  const router = useRouter();
  const route = useRoute();

  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const submitPayment = async () => {
  try {
    // Dummy payment submission
    const paymentResponse = await fetch("http://localhost:3001/user/sewa/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`, // Replace with actual token
      },
      body: JSON.stringify({
        total_bill: totalBill.value,
        payment_method: paymentMethod.value,
        rent_period: rentPeriod.value,
      }),
    });

    if (!paymentResponse.ok) {
      throw new Error("Payment submission failed");
    }

    const paymentData = await paymentResponse.json();
    paymentId.value = paymentData.data["_id"];

    // Create invoice history referencing the payment ID
    const invoiceResponse = await fetch("http://localhost:3001/user/sewa/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        bill: totalBill.value,
        status: "Pending",
        payment_id: paymentId.value,
      }),
    });

    if (!invoiceResponse.ok) {
      throw new Error("Invoice submission failed");
    }
    const invoiceData = await invoiceResponse.json();
    const invoiceId = invoiceData.data["_id"];

    // Create user details with invoice history
    await fetch(`http://localhost:3001/user/sewa/user-detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        user_id: userId.value,
        invoice_id: invoiceId,
      }),
    });

    alert("Invoice berhasil diproses! Silakan melakukan pembayaran");
    showInvoice.value = true;
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Terjadi kesalahan saat memproses pembayaran.");
  }
};

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice Pembelian", 10, 10);
    doc.text(`Invoice ID: ${paymentId.value}`, 10, 30);
    doc.text(`Total: ${formatCurrency(totalBill.value)}`, 10, 40);
    doc.text(`Payment Method: ${paymentMethod.value}`, 10, 50);
    doc.save('invoice.pdf');

    alert("Invoice berhasil diunduh");
    router.push("/user");
  };

  onMounted(() => {
    const query = route.query;
    const period = query.period && typeof query.period === 'string' 
      ? parseInt(query.period) 
      : 3;

    const extras = query.extras && typeof query.extras === 'string' 
      ? query.extras.split(',') 
      : [];

    userId.value = localStorage.getItem("userId") || '';
    token.value = localStorage.getItem("token") || '';
    rentPeriod.value = period;
    facility.value = extras;

    let basePrice = period === 3 ? 6000000 : 12000000;
    let extrasPrice = 0;

    if (extras.includes('Laundry')) {
      extrasPrice += period === 3 ? 600000 : 1200000;
    }

    if (extras.includes('Cleaning Service')) {
      extrasPrice += period === 3 ? 300000 : 600000;
    }

    if (extras.includes('Catering')) {
      extrasPrice += period === 3 ? 3000000 : 6000000;
    }

    totalBill.value = basePrice + extrasPrice;
  });
  </script>
  