<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import TodoInput from '../../components/TodoInput/index.vue';
import TodoList from '../../components/TodoList/index.vue';
import type {IUseTodo} from '../../hooks';
import {useTodo} from '../../hooks';
import {Store, useStore} from 'vuex';

const {setTodoList}: IUseTodo = useTodo();
const store: Store<any> = useStore();
const todoList = computed(() => store.state.list);
onMounted(() => {
	setTodoList();
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
