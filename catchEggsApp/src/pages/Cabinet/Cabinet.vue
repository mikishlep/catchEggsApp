<script setup>

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
</style>