<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { hideBackButton, initBackButton } from "@/utils/telegramApi/backBtn.js";
import { useUiStore } from "@/stores/ui.js";
import BaseGame from "@/pages/Games/BaseGame.js";
import FlappyScene from "@/pages/Games/scenes/FlappyScene.js";

const uiStore = useUiStore();
const gameContainer = ref(null);
let game = null;

onMounted(() => {
  initBackButton();
  uiStore.showNavbar = false;

  game = new BaseGame(gameContainer, FlappyScene);
  game.start();
});

onUnmounted(() => {
  hideBackButton();
  uiStore.showNavbar = true;

  if (game) game.destroy();
});
</script>

<template>
  <div ref="gameContainer" class="game-container"></div>
</template>

<style scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>