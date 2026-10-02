<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue";
import type { Todo } from "../types/todo";

const props = defineProps<{
	todo: Todo;
}>();

const emit = defineEmits<{
	toggle: [id: string];
	remove: [id: string];
	update: [id: string, title: string];
}>();

const isEditing = ref(false);
const editedTitle = ref("");
const editInput = useTemplateRef<HTMLInputElement>("editInput");

async function startEditing(): Promise<void> {
	editedTitle.value = props.todo.title;
	isEditing.value = true;

	await nextTick();
	editInput.value?.focus();
}

function saveEdit(): void {
	const title = editedTitle.value.trim();

	if (!title) {
		return;
	}

	emit("update", props.todo.id, title);
	isEditing.value = false;
}

function cancelEdit(): void {
	isEditing.value = false;
	editedTitle.value = "";
}
</script>

<template>
  <li
    class="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4"
  >
    <input
      :id="`todo-${todo.id}`"
      :checked="todo.completed"
      type="checkbox"
      class="size-5 cursor-pointer accent-zinc-900"
      :aria-label="`Mark ${todo.title} as ${todo.completed ? 'active' : 'completed'}`"
      @change="emit('toggle', todo.id)"
    />

    <div class="min-w-0 flex-1">
      <form
        v-if="isEditing"
        class="flex gap-2"
        @submit.prevent="saveEdit"
      >
        <input
          ref="editInput"
          v-model="editedTitle"
          type="text"
          class="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
          @keydown.esc="cancelEdit"
        />

        <button
          type="submit"
          class="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100"
        >
          Save
        </button>
      </form>

      <button
        v-else
        type="button"
        class="w-full text-left"
        @dblclick="startEditing"
      >
        <span
          class="block truncate"
          :class="{ 'text-zinc-400 line-through': todo.completed }"
        >
          {{ todo.title }}
        </span>
      </button>
    </div>

    <div class="flex items-center gap-1">
      <button
        v-if="!isEditing"
        type="button"
        class="rounded-lg px-3 py-2 text-sm text-zinc-500 opacity-0 transition hover:bg-zinc-100 hover:text-zinc-900 group-hover:opacity-100 focus:opacity-100"
        :aria-label="`Edit ${todo.title}`"
        @click="startEditing"
      >
        Edit
      </button>
    
      <button
        type="button"
        class="rounded-lg px-3 py-2 text-sm text-zinc-500 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100"
        :aria-label="`Delete ${todo.title}`"
        @click="emit('remove', todo.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>