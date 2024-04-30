<script setup>
import { ref, reactive } from 'vue'

const counter = reactive({ count: 0});
const message = ref('Hello World!')
const titleClass = ref('titleStyle');

const count = ref(0)
function increment() {
  count.value++
}

const text = ref('')
function onInput(e) {
  text.value = e.target.value
}
const text2 = ref('')

</script>

<template>
  <h1>{{ message }}</h1>
  <h1>{{ message.split('').reverse().join('_') }}</h1>
  <p>count is : {{  counter.count }}</p>

  <h1 v-bind:class="titleClass">Make me red1</h1>
  <h1 :class="titleClass">Make me red2</h1>

  <button v-on:click="increment"> count is: {{ count }}</button>
  <button @click="increment"> count is: {{ count }}</button>

  <input :value="text" @input="onInput" placeholder="type here">
  <p>{{ text }}</p>

  <input v-model="text2" placeholder="type here">
  <p>{{ text2 }}</p>

  <h1 v-if="awesome">vue is awesome</h1>

</template>

<style>
.titleStyle{
  color: red;
}

</style>