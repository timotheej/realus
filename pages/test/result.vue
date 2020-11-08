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

    data() {
        return {

        }
    },

    methods: {
        calculTrendByGroup(groupId) {
            const byGroup = this.getTestResult.responses.filter(({
                group
            }) => group === groupId);

            const sum = byGroup.reduce(function (accumulator, currentValue) {
                return accumulator + parseInt(currentValue.response);
            }, 0);

            let numberOfQuestion = Object.keys(byGroup).length;

            let average = sum / numberOfQuestion;

            let max = (5 * numberOfQuestion) / numberOfQuestion;
            let min = (1 * numberOfQuestion) / numberOfQuestion;
            let mid = (3 * numberOfQuestion) / numberOfQuestion;

            if (average < mid) {
                return 'A'
            } else if (average > mid) {
                return 'B'
            } else if (average == mid) {
                return 'N'
            } else {
                return 'E'
            }
        }
    },

    mounted() {
        this.calculTrendByGroup(2)
    },

    computed: mapGetters({
        getTestResult: 'test/getTestResult'
    })
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";
</style>
