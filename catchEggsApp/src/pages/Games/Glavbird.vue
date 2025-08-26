<script setup>
import {onMounted, onUnmounted} from "vue";
import {hideBackButton, initBackButton} from "@/utils/telegramApi/backBtn.js";
import { useUiStore } from "@/stores/ui.js";

const uiStore = useUiStore();

onMounted(() => {
  initBackButton();
  uiStore.showNavbar = false;
});

onUnmounted(() => {
  hideBackButton();
  uiStore.showNavbar = true;
});
</script>

<template>
  <h1>lelele</h1>
</template>

<style scoped>

</style>