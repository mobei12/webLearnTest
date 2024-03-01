<template>
  <div>
    <label for="inputValue">内容输入框</label>
    <input id="inputValue" type="text" placeholder="输入内容" v-model="todoValue" @keyup="setTodoValue"/>
  </div>
</template>

<script lang='ts'>
import {defineComponent, ref} from "vue";
import {useTodo, type IUseTodo} from '../../hooks'

export default defineComponent({
  name: "TodoInput",
  setup() {
    const todoValue = ref<string>('')
    const {setTodo}: IUseTodo = useTodo()
    const setTodoValue = (e: KeyboardEvent): void => {
      if (e.code === 'Enter' && todoValue.value.trim()) {
        setTodo(todoValue.value)
        todoValue.value = ''
      }
    }
    return {
      todoValue,
      setTodoValue
    }
  }
});
</script>

<style>
</style>
