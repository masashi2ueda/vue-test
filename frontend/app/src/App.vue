<script setup>
import { ref, reactive } from 'vue'

// reference test
const counter = reactive({ count: 0});
const message = ref('Hello World!')
const titleClass = ref('titleStyle');

// event test
const count = ref(0)
function increment() {
  count.value++
}

// form biding
const text = ref('')
function onInput(e) {
  text.value = e.target.value
}
const text2 = ref('')

// condition rendering
const cr_flag = ref(true)
function cr_toggle() {
  cr_flag.value = !cr_flag.value
}

</script>

<template>
  <!-- reference test -->
  <h1>{{ message }}</h1>
  <h1>{{ message.split('').reverse().join('_') }}</h1>
  <p>count is : {{  counter.count }}</p>

  <!-- bind test -->
  <h1 v-bind:class="titleClass">Make me red1</h1>
  <h1 :class="titleClass">Make me red2</h1>

  <!-- event test -->
  <button v-on:click="increment"> count is: {{ count }}</button>
  <button @click="increment"> count is: {{ count }}</button>

  <!-- form binding -->
  <input :value="text" @input="onInput" placeholder="type here">
  <p>{{ text }}</p>
  <input v-model="text2" placeholder="type here">
  <p>{{ text2 }}</p>

  <!-- condition rendering -->
  <button @click="cr_toggle"> cr_toggle</button>
  <h1 v-if="cr_flag">vue is awesome</h1>
  <h1 v-else>oh no</h1>

</template>

<style>
/* binde test */
.titleStyle{
  color: red;
}

</style>