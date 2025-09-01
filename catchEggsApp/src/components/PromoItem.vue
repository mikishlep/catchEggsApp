<script setup>
import { copyToBuffer } from "@/utils/copyToBuffer.js";

const props = defineProps({
  promoCompany: String,
  promoText: String,
  promoLogo: String,
  promoCode: String,
})

async function handleCopy() {
  try {
    await copyToBuffer(props.promoCode);
    console.log('Промокод скопирован');
  } catch (e) {
    console.error('Не удалось скопировать', e);
  }
}
</script>

<template>
  <div class="promo-item">
    <div class="promo-grid">
      <div class="promo-row">
        <div class="promo-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512">
            <path d="M110.76,512L456.019,243.343,209.316,0Z" fill="var(--main-color)"></path>
            <path d="M29.981,482.6l79.531-40.285,28.694-152.975Z" fill="var(--main-color)"></path>
            <path d="M286.664,1.088l-14.97,34.569,119.764,125.21" fill="var(--main-color)"></path>
          </svg>
        </div>
        <div class="promo-content">
          <h3>{{ promoCompany }}</h3>
<!--          <p>{{ promoText }}</p>-->
        </div>
      </div>
      <div class="promo-row no-logo">
        <button  class="promocode" @click="handleCopy">
          <span>{{ promoCode }}</span>
        </button>
        <button class="copy" @click="handleCopy">
          <img src="@/assets/icons/copy.svg" alt="Скопировать">
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.promo-item {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: var(--main-shadow);
}

.promo-grid {
  display: flex;
  flex-direction: column;
}

.promo-row {
  display: flex;
  align-items: stretch;
  padding: 10px;
  gap: 10px;
}

.promo-row img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
}

.promo-logo svg {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.promo-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.promo-content h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.promo-content p {
  margin: 5px 0 0 0;
  font-size: 0.875rem;
  line-height: 1.3;
}

.promo-row.no-logo {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: stretch;
}

.promocode {
  width: 100%;
  padding: 8px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--main-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.copy {
  width: auto;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7e7e7;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
}

.copy img {
  width: 50%;
  height: 50%;
  object-fit: contain;
  border-radius: 0;
}
</style>