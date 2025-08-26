<script setup>
import {onMounted, onUnmounted} from "vue";
import {hideBackButton, initBackButton} from "@/utils/telegramApi/backBtn.js";

onMounted(() => {
  initBackButton();
});

onUnmounted(() => {
  hideBackButton();
});
</script>

<template>
  <h1>lelele</h1>
</template>

<style scoped>

</style>