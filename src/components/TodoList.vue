<script setup lang="ts">
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem.vue";

defineProps<{
	todos: Todo[];
}>();

const emit = defineEmits<{
	toggle: [id: string];
	remove: [id: string];
	update: [id: string, title: string];
}>();
</script>

<template>
  <div
    v-if="todos.length === 0"
    class="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500"
  >
    No tasks here.
  </div>

  <ul v-else class="space-y-2">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
      @update="(id, title) => emit('update', id, title)"
    />
  </ul>
</template>