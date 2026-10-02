<script setup lang="ts">
import TodoFilters from "./components/TodoFilters.vue";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import { useTodos } from "./composables/useTodos";

const {
	todos,
	filter,
	filteredTodos,
	remainingCount,
	addTodo,
	toggleTodo,
	removeTodo,
	updateTodo,
} = useTodos();
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-4 py-16 text-zinc-900">
    <section class="mx-auto w-full max-w-2xl">
      <header class="mb-10">
        <p class="mb-2 text-sm font-medium text-zinc-500">
          PULSONIC technical interview
        </p>

        <h1 class="text-4xl font-semibold tracking-tight">
          Todo list
        </h1>

        <p class="mt-3 text-zinc-500">
          Keep track of what needs to be done.
        </p>
      </header>

      <TodoForm class="mb-8" @add="addTodo" />

      <div
        v-if="todos.length > 0"
        class="mb-5 flex flex-wrap items-center justify-between gap-3"
      >
        <p class="text-sm text-zinc-500">
          {{ remainingCount }}
          {{ remainingCount === 1 ? "task" : "tasks" }} remaining
        </p>

        <TodoFilters v-model="filter" />
      </div>

      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @update="updateTodo"
      />

      <footer class="mt-6 text-center text-xs text-zinc-400">
        Your tasks are stored locally in your browser.
      </footer>
    </section>
  </main>
</template>
