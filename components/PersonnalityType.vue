<template>
<div>
    <div class="flex flex-row w-full my-8 items-center">
        <div class="w-2/12 mx-2"><span class="text-gray-600 uppercase font-normal block text-left">{{ typeA }}</span></div>
        <div class="w-8/12">
            <ProgressBar :percentage="avg" class="h-4"></ProgressBar>
        </div>
        <div class="w-2/12 mx-2"><span class="text-gray-600 uppercase font-normal block text-right">{{ typeB }}</span></div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        typeA: {
            type: String,
            default: "null"
        },
        typeB: {
            type: String,
            default: "null"
        },
        avg: {
            type: Number,
            default: 0,
        }
    },

    methods: {

    },

    mounted() {

    }
}
</script>
