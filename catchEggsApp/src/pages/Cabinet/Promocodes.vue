<script setup>
import PromoItem from "@/components/PromoItem.vue";
import { promoTest } from "@/data/promoTest.js";
import { initBackButton, hideBackButton } from "@/utils/telegramApi/backBtn.js";
import { onMounted, onUnmounted, computed, ref } from "vue";
import router from "@/router/index.js";
import { useUserStore } from "@/stores/user.js";
import { createCoupon } from "@/services/promoService.js";

onMounted(() => {
  initBackButton();
});

onUnmounted(() => {
  hideBackButton();
});

const userStore = useUserStore();

const coupons = computed(() => userStore.coupons);

async function handleCreateCoupon() {
  const newCoupon = await createCoupon();
  if (newCoupon) {
    userStore.setCoupons([...userStore.coupons, newCoupon]);
  }
}

function formatPromoCompany(coupon) {
  if (!coupon) return '';
  const suffix = coupon.promoCount === 0 ? '%' : '₽';
  return `${coupon.name} ${coupon.description}${suffix}`;
}
</script>

<template>
  <div class="promo-container">
    <PromoItem
        v-for="coupon in coupons"
        :key="coupon.id"
        :promoCompany="formatPromoCompany(coupon)"
        :promoLogo="coupon.promoLogo || null"
        :promoText="coupon.description"
        :promoCode="coupon.tokenHash"
    />
    <button class="create-coupon" @click="handleCreateCoupon">
      <span>Получить промокод</span>
    </button>
  </div>
</template>

<style scoped>
.promo-container {
  display: grid;
  gap: 20px
}

.create-coupon {
  background: #e7474c;
  border-radius: 12px;
  width: 100%;
  display: flex;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
}
</style>