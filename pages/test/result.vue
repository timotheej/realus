<template>
<div>
    <HeaderPage header-title="Résultat du test de personnalité" />

    <div class="container mx-auto rounded-md flex flex-col shadow-2xl p-8 -m-16 z-20 bg-white">

    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    layout: 'default',
    middleware: 'test',

    mounted() {
        console.log("result " + JSON.stringify(this.getTestResult))
    },

    computed: mapGetters({
        getTestResult: 'test/getTestResult'
    })
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";
</style>
