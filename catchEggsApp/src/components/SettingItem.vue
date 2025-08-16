<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
    title: String,
    icon: String,
    arrow: String,
    isFirst: Boolean,
    isLast: Boolean,
    iconBackground: String
});

function handleClick() {
    emit('click');
};
</script>

<template>
    <div class="cabinet-block" :class="{ 'first': props.isFirst, 'last': props.isLast }" @click="handleClick">
        <div class="cabinet-item">
            <div class="cabinet-item__left">
                <div class="cabinet-item__icon-wrapper" :style="{ 'backgroundColor': props.iconBackground }">
                    <img :src="props.icon" alt="Иконка" class="cabinet-item__icon">
                </div>
                <p>{{ props.title }}</p>
            </div>
            <img :src="props.arrow" alt="Стрелка" class="cabinet-item__arrow">
        </div>
    </div>
</template>

<style scoped>
.cabinet-item__icon-wrapper {
    width: 30px;
    height: 30px;
    padding: 7px;
    border-radius: 7px;
}

.cabinet-block {
    background: #fff;
    padding: 10px 15px;
    cursor: pointer;
    border-bottom: 1px solid #ededed;
}

.cabinet-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cabinet-item__left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cabinet-block.first {
    border-top-left-radius: 12px;
    border-top-right-radius:12px;
}

.cabinet-block.last {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-bottom: none;
}

.cabinet-item__arrow {
    width: 17px;
    height: 17px;
}
</style>