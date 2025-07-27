<script setup>

</script>

<template>
<nav>
    <hr></hr>
    <div class="nav-bottom">
        <img src="../assets/icons/gamepad.svg" alt="Игры">
        <img src="../assets/icons/user.svg" alt="Кабинет">
    </div>
</nav>
</template>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

.nav-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    padding: 15px 0;
}

hr {
    border: none;
    height: 1px;
    background-color: #c1c1c1;
}
</style>