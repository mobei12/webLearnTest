<template>
  <div>
    <label :for="item.id" :class="item.status=== FINISHED ?'line-through':'' ">{{ item.content }}</label>
    <input type="checkbox" :checked="item.status=== FINISHED" @click="setStatus(item.id)" name="test" :id="item.id">
    <button @click="removeTodo(item.id)">删除</button>
    <button v-if="item.status!==FINISHED" @click="setDoing(item.id)" :class="item.status ===DOING?'doing':'will-do'">
      {{ item.status === DOING ? '正在做。。。' : '马上做' }}
    </button>
  </div>
</template>


<script lang='ts'>
import {defineComponent, type PropType} from "vue";
import type {ITodo} from "../../typings";
import {TODO_STATUS} from "../../typings";

interface IStatusState {
  DOING: TODO_STATUS
  FINISHED: TODO_STATUS
  WILLDO: TODO_STATUS
}

export default defineComponent({
  name: "TodoItem",
  props: {
    item: Object as PropType<ITodo>
  },
  setup(props, {emit}) {
    const statusState = <IStatusState>{
      DOING: TODO_STATUS.DOING,
      FINISHED: TODO_STATUS.FINISHED,
      WILLDO: TODO_STATUS.WILLDO
    }
    const removeTodo = (id: number): void => {
      emit('removeTodo', id)
    }
    const setStatus = (id: number): void => {
      emit('setStatus', id)
    }
    const setDoing = (id: number): void => {
      emit('setDoing', id)
    }
    return {
      ...statusState,
      removeTodo, setStatus, setDoing
    }
  }
});
</script>

<style>
.line-through {
  text-decoration: line-through;
}

.doing {
  background-color: #cdcdcd;
  color: #000
}

.will-do {
  background-color: brown;
  color: white
}
</style>
