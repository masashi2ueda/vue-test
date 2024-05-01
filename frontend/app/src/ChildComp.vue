<script setup>
// propertyの処理(子では変更できない)
const props = defineProps({
    msg: String
})

// emitの宣言と実装
const emit = defineEmits(['response1', 'response2'])
function bt1(){
    emit('response1', 'res1')
}
function bt2(){
    // function_name, arg1, arg2
    emit('response2', 'res21', 'res22')
}

// modelの処理(propertyに近いが、子で変更されると親も変更される)
const chModel1 = defineModel('chModel1')
const chModel2 = defineModel('chModel2')

</script>

<template>
    <h2> child comp</h2>
    <h2>{{  msg || 'No props passed yet' }}</h2>
    <div class="mycom">
        <p>chpre1:<slot name="slotname1">ch1</slot></p>
        <p>chpre2:<slot name="slotname2">ch2</slot></p>
    </div>
    <button @click="bt1">emit child2parent1</button>
    <button @click="bt2">emit child2parent2</button>
    <p>chModel1_ch={{  chModel1 }}</p>
    <p>chModel2_ch={{  chModel2 }}</p>
    <button @click="chModel2+=1">add chmodel2</button>
</template>