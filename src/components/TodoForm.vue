<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
	add: [title: string];
}>();

const title = ref("");

function submit(): void {
	const normalizedTitle = title.value.trim();

	if (!normalizedTitle) {
		return;
	}

	emit("add", normalizedTitle);
	title.value = "";
}
</script>

<template>
  <form class="flex gap-3" @submit.prevent="submit">
    <label for="todo-title" class="sr-only">
      New task
    </label>

    <input
      id="todo-title"
      v-model="title"
      type="text"
      placeholder="What needs to be done?"
      autocomplete="off"
      class="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
    />

    <button
      type="submit"
      class="rounded-xl bg-zinc-900 px-5 py-3 font-medium text-white transition hover:bg-zinc-700"
    >
      Add
    </button>
  </form>
</template>