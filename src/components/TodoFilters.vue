<script setup lang="ts">
import type { TodoFilter } from "../types/todo";

defineProps<{
	modelValue: TodoFilter;
}>();

const emit = defineEmits<{
	"update:modelValue": [filter: TodoFilter];
}>();

const filters: Array<{ label: string; value: TodoFilter }> = [
	{ label: "All", value: "all" },
	{ label: "Active", value: "active" },
	{ label: "Completed", value: "completed" },
];
</script>

<template>
  <div class="flex gap-1 rounded-xl bg-zinc-100 p-1">
    <button
      v-for="item in filters"
      :key="item.value"
      type="button"
      class="rounded-lg px-3 py-2 text-sm font-medium transition"
      :class="
        modelValue === item.value
          ? 'bg-white text-zinc-900 shadow-sm'
          : 'text-zinc-500 hover:text-zinc-900'
      "
      @click="emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>