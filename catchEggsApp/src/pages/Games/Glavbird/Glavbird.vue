<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { hideBackButton, initBackButton } from "@/utils/telegramApi/backBtn.js";
import { useUiStore } from "@/stores/ui.js";
import { useUserStore } from "@/stores/user.js";
import BaseGame from "@/pages/Games/BaseGame.js";
import FlappyScene from "@/pages/Games/scenes/FlappyScene.js";

const uiStore = useUiStore();
const userStore = useUserStore();
const gameContainer = ref(null);
let game = null;

const saveScore = (newScore) => {
  userStore.addGlavbirdScore(newScore);
  console.log(`Добавлен счет: ${newScore}, общий счет: ${userStore.getCurrentScore}`);
};

onMounted(() => {
  initBackButton();
  uiStore.showNavbar = false;

  game = new BaseGame(gameContainer, FlappyScene);
  game.start();
  
  // Слушаем событие окончания игры после инициализации
  if (game && game.game) {
    game.game.events.on('gameOver', (finalScore) => {
      saveScore(finalScore);
    });
  }
});

onUnmounted(() => {
  hideBackButton();
  uiStore.showNavbar = true;

  if (game) {
    // Убираем слушатель событий
    if (game.game && game.game.events) {
      game.game.events.off('gameOver');
    }
    game.destroy();
  }
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