<script setup>
import GameItem from "@/components/GameItem.vue";
import { games } from "@/data/games.js";
import { useRouter } from "vue-router";

const router = useRouter();

function handleSelectGame(gameName) {
  const game = games.find(g => g.gameName === gameName);

  if (game?.gameRoute) {
    router.push(game.gameRoute);
  } else {
    console.warn("Такой игры не найдено:", gameName);
  }
}
</script>

<template>
    <section class="main-wrapper">
        <div class="game-list__container">
          <GameItem
              v-for="(game, index) in games"
              :key="index"
              :gameName="game.gameName"
              :gameDescription="game.gameDescription"
              :gamePhoto="game.gamePhoto"
              @selectGame="handleSelectGame"
          />
        </div>
    </section>
</template>

<style scoped>
.main-wrapper {
    padding: 10px 10px 90px 10px;
    min-height: 100vh;
}

.game-list__container {
    max-width: 100%;
}
</style>