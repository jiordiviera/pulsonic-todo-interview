import type { Todo } from "../types/todo";

const STORAGE_KEY = "pulsonic-todos";

export function loadTodos(): Todo[] {
	const storedTodos = localStorage.getItem(STORAGE_KEY);

	if (!storedTodos) {
		return [];
	}

	try {
		return JSON.parse(storedTodos) as Todo[];
	} catch {
		return [];
	}
}

export function saveTodos(todos: Todo[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
