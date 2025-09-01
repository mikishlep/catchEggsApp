<script setup>
import PromoItem from "@/components/PromoItem.vue";
import { promoTest } from "@/data/promoTest.js";
import { initBackButton, hideBackButton } from "@/utils/telegramApi/backBtn.js";
import { onMounted, onUnmounted, computed } from "vue";
import router from "@/router/index.js";
import { useUserStore } from "@/stores/user.js";

onMounted(() => {
  initBackButton();
});

onUnmounted(() => {
  hideBackButton();
});

const userStore = useUserStore();

const coupons = computed(() => userStore.coupons);
</script>

<template>
  <div class="promo-container">
    <PromoItem
        v-for="coupon in coupons"
        :key="coupon.id"
        :promoCompany="coupon.name"
        :promoLogo="coupon.promoLogo || null"
        :promoText="coupon.description"
        :promoCode="coupon.tokenHash"
    />
  </div>
</template>

<style scoped>
.promo-container {
  display: grid;
  gap: 20px
}
</style>