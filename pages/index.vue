<template>
<div>
    <header class="header">
        <Nav />
        <div class="header__contain container">
            <div class="header__content">
                <h1 class="font-light text-white leading-none">Découvre qui tu es <span class="font-medium">réellement</span></h1>
                <span class="text-white text-lg font-light mt-4 block">Compare toi, améliore tes relations</span>

                <a href="#" class="btn btn--large btn--darky mt-12 inline-block">Commence maintenant</a>
            </div>
        </div>
    </header>
    <section class="main">
        <div class="container">

        </div>
    </section>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";

.header {
    @apply h-screen relative flex flex-col;
    background-image: url('~assets/images/header-background.jpg');
    background-size: cover;
    z-index: 0;

    &__contain {
        @apply mx-auto flex items-center;
        height: calc(100% - 12rem);
    }

    &__content {
        @apply max-w-xl;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: url('~assets/images/header-corner.svg');
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: contain;
        height: calc(100% + .1rem);
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
