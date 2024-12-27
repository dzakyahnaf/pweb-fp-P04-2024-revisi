<template>
    <div class="unauthorized text-center middle-bg middle-position min-h-screen ">
      <h1 class="text-5xl text-red-500 font-bold">Access Denied</h1>
      <p class="text-xl">You are not authorized to view this page.</p>
      <p class="py-2 px-3 text-green-500 text-lg">
        <NuxtLink to="/" >      
          Return to Home
        </NuxtLink>
      </p>

    </div>
</template>
<style>
.middle-bg{
  background-image: url(https://previews.123rf.com/images/siraphol/siraphol1901/siraphol190100441/114919195-beautiful-comfortable-white-pillow-on-bed-with-light-lamp-decoration-in-bedroom-interior.jpg);
  background-size: cover;
}
.middle-position{
  padding: 250px;
}
</style>
  