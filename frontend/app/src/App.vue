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

// list rendering
let lr_id = 0
const lr_newTodo = ref('')
const lr_todos = ref([
  {id: lr_id++, text: 'lr1'},
  {id: lr_id++, text: 'lr2'},
  {id: lr_id++, text: 'lr3'},
])
function lr_addTodo() {
  lr_todos.value.push({id: lr_id++, text: lr_newTodo.value})
  lr_newTodo.value = ''
}
function lr_removeTodo(todo) {
  lr_todos.value = lr_todos.value.filter((t) => t !== todo)
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

  <!-- list rendering -->
  <form @submit.prevent="lr_addTodo">
    <input v-model="lr_newTodo" required placeholder="new todo">
    <button>Add todo</button>
  </form>
  <ul>
    <li v-for="todo in lr_todos" :key="todo.id">
      {{  todo.text }}
      <button @click="lr_removeTodo(todo)">X</button>
    </li>
  </ul>


</template>

<style>
/* binde test */
.titleStyle{
  color: red;
}

</style>