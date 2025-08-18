<script setup>
import PromoItem from "@/components/PromoItem.vue";
import { promoTest } from "@/data/promoTest.js";
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