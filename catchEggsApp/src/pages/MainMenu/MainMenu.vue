<script setup>
import GamePoint from "@/pages/MainMenu/GamePoint.vue";
import { games } from "@/data/games.js";
</script>

<template>
    <section class="main-wrapper">
        <div class="game-list__container">
          <GamePoint
              v-for="(game, index) in games"
              :key="index"
              :gameName="game.gameName"
              :gameDescription="game.gameDescription"
              :gamePhoto="game.gamePhoto"
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