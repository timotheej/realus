<template>
<div>
    <div class="flex flex-row w-full my-8 items-center">
        <div class="w-2/12 mx-2"><span class="block text-left text-gray-600">{{ percentageA }}%</span><span :class="`text-${colorTextA}`" class="uppercase font-medium block text-left">{{ typeA }}</span></div>
        <div class="w-8/12">
            <ProgressBar :percentage="progressAvg" :color="colorBar" :bgColor="bgBar" class="h-3"></ProgressBar>
        </div>
        <div class="w-2/12 mx-2"><span class="block text-right text-gray-600">{{ percentageB }}%</span><span :class="`text-${colorTextB}`" class="uppercase font-medium block text-right">{{ typeB }}</span></div>
    </div>
    <hr />
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
            return 100 - Math.round(this.avg)
        },
        percentageB: function () {
            return Math.round(this.avg)
        },
        progressAvg: function () {
            return 100 - Math.round(this.avg);
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
        },

        colorTextA: function () {
            if (this.percentageA > 50) {
                return this.color;
            } else {
                return "gray-500"
            }
        },
        colorTextB: function () {
            if (this.percentageB > 50) {
                return this.color;
            } else {
                return "gray-500"
            }
        }
    },
}
</script>
