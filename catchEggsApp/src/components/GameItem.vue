<script setup>
const emit = defineEmits(['selectGame']);
const props = defineProps({
  gameName: String,
  gameDescription: String,
  gamePhoto: String,
})

function handleClick() {
  emit('selectGame', props.gameName);
}
</script>

<template>
  <div class="game-point">
    <div class="game-image" :style="{ 'backgroundImage': `url(${gamePhoto})` }"></div>
    <div class="game-info">
      <h2 class="game-name">{{ gameName }}</h2>
      <p class="game-description">{{ gameDescription }}</p>
      <button class="game-start" @click="handleClick">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="22" viewBox="0 0 17 22" fill="white">
          <path
              d="M1 3.98951C1 3.01835 1 2.53277 1.20249 2.2651C1.37889 2.03191 1.64852 1.88761 1.9404 1.87018C2.27544 1.85017 2.67946 2.11953 3.48752 2.65823L14.0031 9.6686C14.6708 10.1137 15.0046 10.3363 15.1209 10.6168C15.2227 10.8621 15.2227 11.1377 15.1209 11.383C15.0046 11.6635 14.6708 11.886 14.0031 12.3312L3.48752 19.3415C2.67946 19.8802 2.27544 20.1496 1.9404 20.1296C1.64852 20.1122 1.37889 19.9679 1.20249 19.7347C1 19.467 1 18.9814 1 18.0103V3.98951Z"
              stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-point {
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--main-shadow);
  border: 1px solid #ddd;
}

.game-image {
  width: 100%;
  height: 120px;
  background: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 15px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.game-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.game-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #666;
  margin: 0;
}

.game-start {
  background: #e7474c;
  border-radius: 12px;
  width: 100%;
  display: flex;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 10px 0;
  margin-top: 15px;
}

.game-info {
  display: grid;
  gap: 10px;
}
</style>