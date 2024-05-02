<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <p>Current component: A2</p>
  <span>count: {{ count }}</span>
  <button @click="count++">+</button>
</template>