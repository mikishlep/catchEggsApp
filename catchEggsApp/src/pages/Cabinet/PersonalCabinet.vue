<script setup>
import SettingItem from "@/components/SettingItem.vue";
import icons from '@/assets/icons';
import { openExternal } from "@/utils/openExternal.js";
import { useUserStore } from "@/stores/user.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userStore = useUserStore();
const { providerData } = storeToRefs(userStore);

const displayName = computed(() => {
  const p = providerData.value;
  if (p?.first_name || p?.last_name) {
    return `${p?.first_name ?? ''} ${p?.last_name ?? ''}`.trim();
  }
  return p?.username || "Без имени";
});
</script>

<template>
  <div class="cabinet-container">
    <div class="person-header">
      <div class="person-info">
        <div class="person-photo">
          <img v-if="providerData?.photo_url" :src="providerData.photo_url" alt="Фото профиля">
        </div>
        <div class="person-name">{{ displayName }}</div>
      </div>
    </div>

    <div class="cabinet-btns">
      <div class="cabinet-btns__container">
        <SettingItem
            title="Мои промокоды"
            :icon="icons.promo"
            :arrow="icons.arrow"
            :isFirst="true"
            :isLast="true"
            iconBackground="#dedede"
            @click="$router.push('/cabinet/promocodes')"
        />
      </div>
      <div class="cabinet-btns__container">
        <SettingItem
            title="Главреклама"
            :icon="icons.link"
            :arrow="icons.arrow"
            :isFirst="true"
            iconBackground="#dedede"
            @click="openExternal('https://glavreklamant.ru')"
        />
        <SettingItem
            title="Главвизитка"
            :icon="icons.link"
            :arrow="icons.arrow"
            iconBackground="#dedede"
            @click="openExternal('https://glavvizitka.ru')"
        />
      </div>
      <div class="cabinet-btns__container" style="display: none">
        <SettingItem
            title="Настройки"
            :icon="icons.user"
            :arrow="icons.arrow"
            :isFirst="true"
            :isLast="true"
            iconBackground="#dedede"
            @click="$router.push('/cabinet/settings')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Хедер личного кабинета */

.person-header {
  height: 225px;
  border-radius: 16px;
  background-color: var(--main-color);
  position: relative;
  box-shadow: var(--main-shadow);
}

.person-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.person-photo {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.person-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-name {
  font-weight: 600;
  font-size: 1.2rem;
  color: #fff;
}

.cabinet-container {
  display: grid;
  gap: 10px
}

.cabinet-btns {
  display: grid;
  gap: 10px;
}

.cabinet-btns__container {
  box-shadow: 0 0 10px rgba(49, 49, 49, 0.08);
  border-radius: 16px;
  overflow: hidden;
}
</style>