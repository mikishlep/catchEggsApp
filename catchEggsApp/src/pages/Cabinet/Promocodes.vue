<script setup>
import PromoItem from "@/components/PromoItem.vue";
import { promoTest } from "@/data/promoTest.js";

import { initBackButton, hideBackButton } from "@/utils/telegramApi/backBtn.js";
import { onMounted, onUnmounted } from "vue";
import router from "@/router/index.js";

onMounted(() => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();

    initBackButton(() => {
      router.back();
    });
  }
});

onUnmounted(() => {
  hideBackButton();
});
</script>

<template>
  <div class="promo-container">
    <PromoItem
        v-for="(promo, index) in promoTest"
        :key="index"
        :promoCompany="promo.promoCompany"
        :promoLogo="promo.promoLogo"
        :promoText="promo.promoText"
        :promoCode="promo.promoCode"
    />
  </div>
</template>

<style scoped>
.promo-container {
  display: grid;
  gap: 20px
}
</style>