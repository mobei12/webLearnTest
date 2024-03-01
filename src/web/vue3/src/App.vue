<script lang="ts">
import {computed, defineComponent, onMounted} from "vue";
import TodoInput from "./components/TodoInput/index.vue";
import TodoList from "./components/TodoList/index.vue";
import type {IUseTodo} from "./hooks";
import {useTodo} from "./hooks";
import {Store, useStore} from "vuex";

export default defineComponent({
  name: "App",
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const {setTodoList}: IUseTodo = useTodo()
    const store: Store<any> = useStore()
    onMounted(() => {
      setTodoList()
    })
    return {
      todoList: computed(() => store.state.list)
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <todo-input/>
    <todo-list :todo-list="todoList"/>
  </div>
</template>

<style scoped>
</style>
