<script setup>
import SettingItem from '../../components/SettingItem.vue';
import icons from '@/assets/icons';

// Сторонние сайты
function openExternal(link) {
  if (window.Telegram?.WebApp?.openLink) {
    window.Telegram.WebApp.openLink(link);
  } else {
    window.open(link, '_blank');
  }
}
</script>

<template>
    <section class="main-wrapper">
        <div class="cabinet-container">
            <div class="person-header">
                <div class="person-info">
                    <div class="person-photo"></div>
                    <div class="person-name">Глеб Цейлонский</div>
                </div>
            </div>

            <div class="cabinet-btns">
                <div class="cabinet-btns__container">
                    <SettingItem 
                        title="Скидки и промокоды"
                        :icon="icons.user"
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
                        :icon="icons.user"
                        :arrow="icons.arrow"
                        :isFirst="true"
                        iconBackground="#dedede"
                        @click="openExternal('https://glavreklamant.ru')"
                    />
                    <SettingItem 
                        title="Главвизитка"
                        :icon="icons.user"
                        :arrow="icons.arrow"
                        iconBackground="#dedede"
                        @click="openExternal('https://glavvizitka.ru')"
                    />
                </div>
                <div class="cabinet-btns__container">
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
    </section>
</template>

<style scoped>
.main-wrapper {
    padding: 10px;
    padding-bottom: 90px;
    min-height: 100vh;
}

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
}

.person-name {
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
}

.cabinet-container {
    display: grid;
    gap: 20px
}

.cabinet-btns {
    display: grid;
    gap: 20px;
}

.cabinet-btns__container {
    box-shadow: 0 0 10px rgba(49, 49, 49, 0.08);
    border-radius: 16px;
    overflow: hidden;
}
</style>