<template>
  <div>
    <TodoItem v-for="item of todoList " :key="item.id" :item="item" @removeTodo="removeTodo" @setStatus="setStatus"
              @setDoing="setDoing"/>
  </div>
</template>

<script lang='ts'>
import {defineComponent, type PropType} from "vue";
import TodoItem from "./Item.vue";
import type {ITodo} from "../../typings";
import {type IUseTodo, useTodo} from "../../hooks";

export default defineComponent({
  name: "TodoList",
  props: {
    todoList: Array as PropType<ITodo[]>
  },
  components: {
    TodoItem,
  },
  setup() {
    const {removeTodo, setStatus, setDoing}: IUseTodo = useTodo()
    return {
      removeTodo, setStatus, setDoing
    }
  }
});
</script>

<style>
</style>
