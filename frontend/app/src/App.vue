<script setup>
import { ref, reactive , computed, onMounted, watch} from 'vue'

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

////////////////
// condition rendering
////////////////

const cr_flag = ref(true)
function cr_toggle() {
  cr_flag.value = !cr_flag.value
}

////////////////
// list rendering
////////////////

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

////////////////
// calc property
////////////////
let cp_id = 0
const cp_newTodo = ref('')
const cp_hideCompleted = ref(false)
const cp_todos = ref([
  {id: cp_id++, text: 'cp1', done: true},
  {id: cp_id++, text: 'cp2', done: true},
  {id: cp_id++, text: 'cp3', done: false},
])
const cp_fiteredTodos = computed(() =>{
  // computedの中で使われる値(cp_hideCompletedの状態更新を追跡して、cp_fiteredTodosを使っている表示の結果が更新される)
  const is_hide = cp_hideCompleted.value
  let dst = null
  if(is_hide){
    dst = cp_todos.value.filter((t) => !t.done)
  }else{
    dst = cp_todos.value
  }
  return dst
})
function cp_addTodo() {
  cp_todos.value.push({id: cp_id++, text: cp_newTodo.value, done: false})
  cp_newTodo.value = ''
}
function cp_removeTodo(todo) {
  cp_todos.value = cp_todos.value.filter((t) => t!==todo)
}

////////////////
// life cycle templete
////////////////
const lct_ref = ref(null)
onMounted(() =>{
  // これはdomの値をpの値を編集していることになる
  lct_ref.value.textContent = 'mounted'
})


////////////////
// watcher
////////////////
const w_todoId = ref(1)
const w_todoData = ref(null)
async function w_fetchData() {
  // nullにすると、一旦v-ifがfalseになる
  w_todoData.value = null
  // jsonplaceholderというtest用のオープンapiがある
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${w_todoId.value}`
  )
  // 値が入るとv-ifがtrueになる
  w_todoData.value = await res.json()
}
// 最初のfetchする
w_fetchData()
// 監視をやる→w_todoIdが変更されると、w_fetchDataが走る
watch(w_todoId, w_fetchData)

////////////////
// component
////////////////
import ChildComp from './ChildComp.vue';
const cmp_greeting = ref('Hello from parent')
const cmp_childMsg1 = ref('no msg1')
const cmp_childMsg2 = ref('no msg2')
function cmp_Emit(val1, val2){
  console.log(val1, val2)
  cmp_childMsg2.value =val1 + val2
}
const chModel1 = ref(1);
const chModel2 = ref(2);

////////////////
// フォールスルー
////////////////
import MyButton from "./MyButton.vue"
function ft_onClick(){
  console.log("フォールスルー")
}

////////////////
// コンポーザブル
////////////////
import { useMouse } from './mouse.js'
const {mouse_x, mouse_y  } = useMouse()

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

  <!--
  condition rendering
  -->
  <button @click="cr_toggle"> cr_toggle</button>
  <h1 v-if="cr_flag">vue is awesome</h1>
  <h1 v-else>oh no</h1>


  <!--
  list rendering 
  -->
  <form @submit.prevent="lr_addTodo">
    <input v-model="lr_newTodo" required placeholder="new todo">
    <button>Add todo1</button>
  </form>
  <!-- 上と下との違いがわからない -->
  <input v-model="lr_newTodo" required placeholder="new todo">
  <button @click="lr_addTodo">Add todo2</button>
  <ul>
    <!-- idをつけてちゃんとvueに別物であることを伝える -->
    <li v-for="todo in lr_todos" :key="todo.id">
      {{  todo.text }}
      <button @click="lr_removeTodo(todo)">X</button>
    </li>
  </ul>
  <br/>
  <hr/>


  <!--
  calc propetry
  -->
  <h1>calc propetry</h1>
  <form @submit.prevent="cp_addTodo">
    <input v-model="cp_newTodo" required placeholder="new todo">
    <button>add todo</button>
  </form>
  <ul>
    <li v-for="todo in cp_fiteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done">
      <span :class="{cp_done: todo.done}">{{ todo.text }}</span>
      <button @click="cp_removeTodo(todo)">X</button>
    </li>
  </ul>
  <button @click="cp_hideCompleted = !cp_hideCompleted">
    {{  cp_hideCompleted ? 'show all' : "hide completed" }}
  </button>
  <br/>
  <hr/>


  <!--
  life cycle templete
  -->
  <h1>life cycle templete</h1>
  <!-- 下のdomの要素をscriptの中で使うことができる -->
  <p ref="lct_ref">hello1</p>
  <br/>
  <hr/>


  <!--
  watcher
  -->
  <h1>watcher</h1>
  <p>todo id: {{  w_todoId }}</p>
  <button @click="w_todoId++" :disabled="!w_todoData">fetch next todo</button>
  <p v-if="!w_todoData">loading...</p>
  <!-- jsonを綺麗に表示する -->
  <pre v-else>{{ w_todoData }}</pre>
  <br/>
  <hr/>


  <!--
  child component
  -->
  <h1>Child compoment</h1>
  <ChildComp :msg="cmp_greeting"
    @response1="(msg) => cmp_childMsg1=msg"
    @response2="cmp_Emit"
    v-model:chModel1="chModel1"
    v-model:chModel2="chModel2"
    >
    <template v-slot:slotname1>pa1</template>
    <template v-slot:slotname2>pa2</template>
  </ChildComp>
  <p>cmp_childMsg1: {{ cmp_childMsg1 }}</p>
  <p>cmp_childMsg2: {{ cmp_childMsg2 }}</p>
  <button @click="cmp_greeting+='_a'">add a</button>
  <p>chModel1: {{ chModel1 }}</p>
  <p>chModel2: {{ chModel2 }}</p>
  <br/>
  <hr/>

  <!--
  フォールスルー
  -->
  <h1>フォールスルー</h1>
  <!-- mybuttonの中のclickに自動的に結び付けられる -->
  <MyButton class="large" @click="ft_onClick"></MyButton>
  <br/>
  <hr/>

  <!--
  コンポーザブル
  -->
  <h1>コンポーザブル</h1>
  <!-- mybuttonの中のclickに自動的に結び付けられる -->
  Mouse position is at: {{ mouse_x }}, {{ mouse_y }}
  <br/>
  <hr/>
</template>

<style>
/* binde test */
.titleStyle{
  color: red;
}

/* calc property */
.cp_done {
  text-decoration: line-through;
}

</style>