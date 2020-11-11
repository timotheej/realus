<template>
<div>
    <HeaderPage header-title="Résultat du test de personnalité" />

    <div class="container mx-auto rounded-md flex flex-row shadow-2xl p-8 -m-16 z-20 bg-white">
        <div class="w-full sm:w-full md:w-6/12 lg:w-6/12 xl:w-6/12 p-4">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo corporis quas ipsum a at! Deserunt vel illum necessitatibus repudiandae illo adipisci debitis, nam harum voluptatem, perferendis, explicabo tempora earum a?</p>
        </div>
        <div class="w-full sm:w-full md:w-6/12 lg:w-6/12 xl:w-6/12 rounded-md bg-gray-100 p-4">
            <PersonnalityType v-for="group in groups" :key="group.id" :typeA="group.typeA" :typeB="group.typeB" :avg="group.avg" :color="group.color"></PersonnalityType>
        </div>
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
            groups: [{
                    id: 1,
                    avg: Number,
                    typeA: "Extraverti",
                    typeB: "Introverti",
                    color: "purple",
                    trend: null,
                },
                {
                    id: 2,
                    avg: Number,
                    typeA: "Sensation",
                    typeB: "Intuition",
                    color: "yellow",
                    trend: null,
                },
                {
                    id: 3,
                    avg: Number,
                    typeA: "Pensée",
                    typeB: "Sentiment",
                    color: "orange",
                    trend: null,
                },
                {
                    id: 4,
                    avg: Number,
                    typeA: "Jugement",
                    typeB: "Perception",
                    color: "green",
                    trend: null,
                }
            ]
        }
    },

    methods: {
        calculAvgByGroup(groupId) {
            //filter all responses by group
            const byGroup = this.getTestResult.responses.filter(({
                group
            }) => group === groupId);

            // calculate the sum of the group
            const sum = byGroup.reduce(function (accumulator, currentValue) {
                return accumulator + parseInt(currentValue.response);
            }, 0);

            // count the number of questions
            let numberOfQuestion = Object.keys(byGroup).length;

            // averages the sums (multiple by 20 to have a result out of 100)
            return ((sum / numberOfQuestion) * 20);

            // calcul the min / max and mid
            /*             let max = ((5 * numberOfQuestion) / numberOfQuestion) * 20;
                        let min = ((1 * numberOfQuestion) / numberOfQuestion) * 20;
                        let mid = ((3 * numberOfQuestion) / numberOfQuestion) * 20; */

            /* if (average < mid) {
                return 'A'
            } else if (average > mid) {
                return 'B'
            } else if (average == mid) {
                return 'N'
            } else {
                return 'E'
            } */
        },

        async pushAvg() {
            return this.groups.forEach(elm => {
                let result = this.calculAvgByGroup(elm.id)
                elm.avg = result;
            });
        },

        async mostImportantType() {
            this.groups.forEach(elm => {
                if (elm.avg <= 49) {
                    elm.trend = elm.typeA
                } else if (elm.avg >= 51) {
                    elm.trend = elm.typeB
                } else {
                    elm.trend = null
                }
            })
        }
    },

    async mounted() {
        await this.pushAvg();
        await this.mostImportantType();

        console.log('this group ' + JSON.stringify(this.groups))
    },

    computed: mapGetters({
        getTestResult: 'test/getTestResult'
    })
}
</script>

<style lang="scss">
@import "~/assets/css/main.scss";
</style>
