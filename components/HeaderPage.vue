<template>
<div class="h-64" style="background-color: #4560EB">
    <Nav />
    <div class="container mx-auto pt-32 pl-4">
        <h2 class="text-white font-medium">{{ headerTitle }}</h2>
    </div>
</div>
</template>

<script>
export default {
    props: ['headerTitle']
}
</script>
