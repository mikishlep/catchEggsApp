<script setup>
import PromoItem from "@/components/PromoItem.vue";
import { promoTest } from "@/data/promoTest.js";
import { initBackButton, hideBackButton } from "@/utils/telegramApi/backBtn.js";
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import router from "@/router/index.js";
import { useUserStore } from "@/stores/user.js";
import { createCoupon } from "@/services/promoService.js";

const userStore = useUserStore();
const hasResetScore = ref(false);

onMounted(() => {
  initBackButton();
  userStore.loadGlavbirdScore();
});

onUnmounted(() => {
  hideBackButton();
});

const validCoupons = computed(() => {
  const now = new Date();
  return userStore.coupons.filter(coupon => {
    const couponDate = new Date(coupon.createdAt);
    const daysDiff = Math.floor((now - couponDate) / (1000 * 60 * 60 * 24));
    return daysDiff < 7;
  });
});

const coupons = computed(() => validCoupons.value);
const currentScore = computed(() => userStore.getCurrentScore);

const lastCouponDate = computed(() => {
  if (userStore.coupons.length === 0) return null;
  const sortedCoupons = [...userStore.coupons].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return new Date(sortedCoupons[0].createdAt);
});

const daysSinceLastCoupon = computed(() => {
  if (!lastCouponDate.value) return 7;
  const now = new Date();
  const diffTime = now - lastCouponDate.value;
  const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return daysDiff;
});

const daysUntilNextCoupon = computed(() => {
  return Math.max(0, 7 - daysSinceLastCoupon.value);
});

const shouldResetScore = computed(() => {
  return daysSinceLastCoupon.value >= 7 && userStore.coupons.length > 0;
});

watch(shouldResetScore, (newValue) => {
  if (newValue && currentScore.value > 0 && !hasResetScore.value) {
    userStore.setGlavbirdScore(0);
    hasResetScore.value = true;
  } else if (!newValue) {
    hasResetScore.value = false;
  }
});

const canGetPromo = computed(() => {
  return currentScore.value >= 15 && daysSinceLastCoupon.value >= 7;
});

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
    <div class="score-card">
      <div class="score-header">
        <h3>Игра Главптица</h3>
        <div class="score-display">
          <span class="score-number">{{ currentScore }}</span>
          <span class="score-label">очков</span>
        </div>
      </div>
      <div class="score-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: Math.min((currentScore / 15) * 100, 100) + '%' }"
          ></div>
        </div>
        <p class="progress-text" v-if="currentScore < 15">
          Наберите {{ 15 - currentScore }} очков для получения промокода
        </p>
        <p class="progress-text" v-else-if="daysUntilNextCoupon > 0">
          До нового промокода: {{ daysUntilNextCoupon }} дней
        </p>
        <p class="progress-text success" v-else>
          Поздравляем! Вы можете получить промокод
        </p>
      </div>
    </div>

    <PromoItem
        v-for="coupon in coupons"
        :key="coupon.id"
        :promoCompany="formatPromoCompany(coupon)"
        :promoLogo="coupon.promoLogo || null"
        :promoText="coupon.description"
        :promoCode="coupon.tokenHash"
    />

    <button 
      class="create-coupon" 
      :class="{ disabled: !canGetPromo }"
      @click="handleCreateCoupon"
      :disabled="!canGetPromo"
    >
      <span v-if="canGetPromo">Получить промокод</span>
      <span v-else-if="currentScore < 15">Наберите {{ 15 - currentScore }} очков</span>
      <span v-else>Промокод через {{ daysUntilNextCoupon }} дней</span>
    </button>
  </div>
</template>

<style scoped>
.promo-container {
  display: grid;
  gap: 20px
}

.score-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.score-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.score-display {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-number {
  font-size: 2rem;
  font-weight: 700;
  color: #e7474c;
  line-height: 1;
}

.score-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e7474c 0%, #ff6b6b 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

.progress-text.success {
  color: #bdbdbd;
  font-weight: 500;
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
  padding: 12px 0;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.create-coupon:hover:not(.disabled) {
  background: #dc2626;
  transform: translateY(-1px);
}

.create-coupon.disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}
</style>