<script setup>
import MainMenu from './components/MainMenu.vue';

onMounted(() => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();
});
</script>

<template>
  <MainMenu />
</template>

<style scoped>

</style>
