import { computed, ref, watch } from "vue";
import type { Todo, TodoFilter } from "../types/todo";
import { loadTodos, saveTodos } from "../utils/storage";

export function useTodos() {
	const todos = ref<Todo[]>(loadTodos());
	const filter = ref<TodoFilter>("all");

	const filteredTodos = computed(() => {
		switch (filter.value) {
			case "active":
				return todos.value.filter((todo) => !todo.completed);

			case "completed":
				return todos.value.filter((todo) => todo.completed);

			default:
				return todos.value;
		}
	});

	const remainingCount = computed(
		() => todos.value.filter((todo) => !todo.completed).length,
	);

	function addTodo(title: string): boolean {
		const normalizedTitle = title.trim();

		if (!normalizedTitle) {
			return false;
		}

		todos.value.unshift({
			id: crypto.randomUUID(),
			title: normalizedTitle,
			completed: false,
			createdAt: new Date().toISOString(),
		});

		return true;
	}

	function toggleTodo(id: string): void {
		const todo = todos.value.find((todo) => todo.id === id);

		if (todo) {
			todo.completed = !todo.completed;
		}
	}

	function removeTodo(id: string): void {
		todos.value = todos.value.filter((todo) => todo.id !== id);
	}

	function updateTodo(id: string, title: string): boolean {
		const normalizedTitle = title.trim();

		if (!normalizedTitle) {
			return false;
		}

		const todo = todos.value.find((todo) => todo.id === id);

		if (!todo) {
			return false;
		}

		todo.title = normalizedTitle;

		return true;
	}

	watch(
		todos,
		(value) => {
			saveTodos(value);
		},
		{ deep: true },
	);

	return {
		todos,
		filter,
		filteredTodos,
		remainingCount,
		addTodo,
		toggleTodo,
		removeTodo,
		updateTodo,
	};
}
