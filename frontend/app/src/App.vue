<script setup>
import { ref, reactive } from 'vue'

const counter = reactive({ count: 0});
const message = ref('Hello World!')
const titleClass = ref('titleStyle');
</script>

<template>
  <h1>{{ message }}</h1>
  <h1>{{ message.split('').reverse().join('_') }}</h1>
  <p>count is : {{  counter.count }}</p>

  <h1 v-bind:class="titleClass">Make me red1</h1>
  <h1 :class="titleClass">Make me red2</h1>
</template>

<style>
.titleStyle{
  color: red;
}

</style>