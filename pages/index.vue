<template>
<div>
    <header>
        <Nav />
    </header>
    <section class="main">
        <div class="container">

        </div>
    </section>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";

header {
    @apply h-screen relative;
    background-image: url('~assets/images/header-background.jpg');
    background-size: cover;
    z-index: 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: url('~assets/images/header-corner.svg');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: contain;
        height: 100%;
        width: 100%;
        z-index: -1;
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: rgba($primary-color, 0.8);
        height: 100%;
        width: 100%;
        z-index: -2;
    }
}

.main {
    height: 1200px;
}
</style>
