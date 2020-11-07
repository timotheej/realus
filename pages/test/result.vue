<template>
<div>
    <HeaderPage header-title="Résultat du test de personnalité" />

    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-8 -m-16 z-20 bg-white">
        {{ getTestId }}
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    layout: 'default',

    computed: mapGetters({
        getTestId: 'test/getTestId'
    })
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";
</style>
