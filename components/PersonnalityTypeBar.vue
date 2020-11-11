<template>
<div>
    <div class="flex flex-row w-full my-8 items-center">
        <div class="w-2/12 mx-2"><span class="block text-gray-700 text-left">{{ percentageA }}%</span><span class="text-gray-600 uppercase font-normal block text-left">{{ typeA }}</span></div>
        <div class="w-8/12">
            <ProgressBar :percentage="progressAvg" :color="colorBar" :bgColor="bgBar" class="h-3"></ProgressBar>
        </div>
        <div class="w-2/12 mx-2"><span class="block text-gray-700 text-right">{{ percentageB }}%</span><span class="text-gray-600 uppercase font-normal block text-right">{{ typeB }}</span></div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        typeA: {
            type: String,
            default: "null",
        },
        typeB: {
            type: String,
            default: "null"
        },
        avg: {
            type: Number,
            default: 0,
        },
        color: {
            type: String
        },
        bgColor: {
            type: String
        }
    },

    computed: {
        percentageA: function () {
            return 100 - this.avg;
        },
        percentageB: function () {
            return this.avg
        },
        progressAvg: function () {
            return 100 - this.avg;
        },

        // change the side of progress bar in function of percentage
        colorBar: function () {
            if (this.percentageA <= 49) {
                return this.bgColor
            } else if (this.percentageA >= 51) {
                return this.color
            }
        },
        bgBar: function () {
            if (this.percentageA <= 49) {
                return this.color;
            } else if (this.percentageA >= 51) {
                return this.bgColor;
            }
        }
    },
}
</script>
