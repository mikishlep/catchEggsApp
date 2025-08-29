<script setup>
import { onMounted } from 'vue';
import { useUserStore } from "@/stores/user.js";
import Navbar from './components/Navbar.vue';

const userStore = useUserStore();

onMounted(() => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();

  userStore.loadUser();
  console.log("ТГ данные юзера:", userStore.user);
  console.log("ТГ полные данные:", userStore.raw);
  console.log("ТГ инит дата:", userStore.initData);
});
</script>

<template>
  <RouterView />
  <Navbar />
</template>

<style scoped>

</style>
