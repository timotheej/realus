<template>
<div>
    <header class="header">
        <Nav />
        <div class="header__contain container px-4">
            <div class="header__content">
                <h1 class="font-light text-white leading-none">Découvre qui tu es <span class="font-medium">réellement</span></h1>
                <span class="text-white text-lg font-light mt-4 block">Compare toi, améliore tes relations</span>

                <NuxtLink to="/test" class="btn btn--large btn--darky mt-12 inline-block">Commence maintenant</NuxtLink>
            </div>
        </div>
    </header>
    <section class="main">
        <div class="container mx-auto">
            <div class="flex flex-col items-center my-12 mx-4">
                <span class="uppercase text-xs font-semibold color-primary tracking-wide">Découvre qui tu es</span>
                <h2 class="font-medium text-center leading-none mt-2">Comment ça fonctionne ?</h2>
            </div>
        </div>
        <div class="container mx-auto">
            <div class="px-4">
                <div class="flex -mx-2 flex-wrap lg:flex-no-wrap">
                    <div class="flex w-full sm:w-full md:w-1/3 lg:w-2/5 xl:w-2/6 px-4">
                        <div class="flex flex-col rounded-md shadow-xl py-6 px-4">
                            <div class="rounded-full h-16 w-16 flex items-center justify-center" style="background: #E3ECFF">
                                <fa :icon="['fa', 'question']" class="text-3xl color-secondary" />
                            </div>

                            <h5 class="font-medium my-4 leading-none">Une liste de 50 questions</h5>
                            <p class="text-sm text-gray-600 font-normal">Répond à une série de questions afin de connaître au mieux ta personnalité et pouvoir te créer un profil adéquat.</p>
                        </div>
                    </div>
                    <div class="flex w-full sm:w-full md:w-1/3 lg:w-2/5 xl:w-2/6 px-4">
                        <div class="flex flex-col rounded-md shadow-xl py-6 px-4">
                            <div class="rounded-full h-16 w-16 flex items-center justify-center" style="background: #E3ECFF">
                                <fa :icon="['fa', 'clipboard-list']" class="text-3xl color-secondary" />
                            </div>

                            <h5 class="font-medium my-4 leading-none">Tests de personnalités</h5>
                            <p class="text-sm text-gray-600 font-normal">Le système est basé sur les plus grands tests de personnalité tels que le MBTI, Big Fives,..</p>
                        </div>
                    </div>
                    <div class="flex w-full sm:w-full md:w-1/3 lg:w-2/5 xl:w-2/6 px-4">
                        <div class="flex flex-col rounded-md shadow-xl py-6 px-4">
                            <div class="rounded-full h-16 w-16 flex items-center justify-center" style="background: #E3ECFF">
                                <fa :icon="['fa', 'sync']" class="text-3xl color-secondary" />
                            </div>

                            <h5 class="font-medium my-4 leading-none">Compare toi aux autres</h5>
                            <p class="text-sm text-gray-600 font-normal">Compare toi aux autres et découvrez vos points communs, ce qui fait votre force et faiblesses.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-20 sm:mt-20 md:mt-48 lg:mt-48 xl:mt-48 flex flex-row">
            <div class="w-0 sm:w-0 md:w-1/5 lg:w-2/5 xl:w-2/5"></div>
            <div class="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-3/5 h-auto flex py-24" style="background-color:#040C31; border-top-left-radius: 6rem;">
                <div class="w-1/12 sm:w-1/12 md:w-4/12 lg:w-3/12 xl:w-3/12 phone"></div>
                <div class="w-10/12 sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-5/12">
                    <h2 class="font-medium text-left leading-none text-white mb-10">À propos</h2>
                    <p class="leading-none text-white text-sm font-light my-4"><strong>Realus</strong> est une application en développement et en constante évolution, plus nous auront de données plus nous serons en mesure de te founir une expérience fiable</p>
                    <p class="leading-none text-white text-sm font-light my-4"><strong>Realus</strong> n’est pas un simple test de personnalité, de nouvelles fonctionnalités sont à prévoir, reste informé</p>

                    <ul class="list-style">
                        <li>Un système unique</li>
                        <li>Test totalement gratuit</li>
                        <li>Un système unique</li>
                        <li>Test totalement gratuit</li>
                    </ul>
                </div>
                <div class="w-1/12 sm:w-1/12 md:w-2/12 lg:w-3/12 xl:w-4/12"></div>
            </div>
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
        @apply mx-auto flex items-center h-full;
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

    min-height: 1200px;

    .phone {
        @apply relative;

        &::before {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            left: -7.5rem;
            background-image: url('~assets/images/phone.png');
            background-repeat: no-repeat;
            background-size: contain;
            height: 32rem;
            width: 15rem;

            @media (max-width: 768px) {
                display: none;
            }
        }
    }

    .list-style {
        @apply text-white text-sm mt-10;
        list-style: none;

        li {
            @apply font-light my-2 pl-8;
            background-image: url('~assets/images/bullet.svg');
            background-repeat: no-repeat;
        }
    }
}
</style>
