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
            <div class="cabinet-item__icon-wrapper" :style="{ 'backgroundColor': props.iconBackground }">
                <img :src="props.icon" alt="Иконка" class="cabinet-item__icon">
            </div>
            <p>{{ props.title }}</p>
            <img :src="props.arrow" alt="Стрелка" class="cabinet-item__arrow">
        </div>
    </div>
</template>

<style scoped>
.cabinet-item__icon-wrapper {
    width: 15px;
    height: 15px;
    padding: 4px;
}

.cabinet-block {
    background: #fff;
    padding: 10px 15px;
    cursor: pointer;
}

.cabinet-item {
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cabinet-item.first {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.cabinet-item.last {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: none;
}
</style>