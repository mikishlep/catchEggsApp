<script setup>
import { onMounted } from 'vue';
import MainMenu from './pages/MainMenu.vue';
import Navbar from './components/Navbar.vue';

onMounted(() => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();
});
</script>

<template>
  <MainMenu />
  <Navbar />
</template>

<style scoped>

</style>
