<script setup>
const props = defineProps({
    msg: String
})
const emit = defineEmits(['response1', 'response2'])

function bt1(){
    emit('response1', 'res1')
}
function bt2(){
    emit('response2', 'res2')
}

</script>

<template>
    <h2> child comp</h2>
    <h2>{{  msg || 'No props passed yet' }}</h2>
    <button @click="bt1">emit child2parent1</button>
    <button @click="bt2">emit child2parent2</button>
    <div class="mycom">
        <p>chpre1:<slot name="slotname1">ch1</slot></p>
        <p>chpre2:<slot name="slotname2">ch2</slot></p>
    </div>

</template>