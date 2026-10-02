import { beforeEach, describe, expect, it } from "vitest";
import { useTodos } from "./useTodos";

describe("useTodos", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it("starts with an empty todo list", () => {
		const { todos } = useTodos();

		expect(todos.value).toEqual([]);
	});

	it("adds a todo", () => {
		const { todos, addTodo } = useTodos();

		const result = addTodo("Learn Vue");

		expect(result).toBe(true);
		expect(todos.value).toHaveLength(1);
		expect(todos.value[0]?.title).toBe("Learn Vue");
		expect(todos.value[0]?.completed).toBe(false);
	});

	it("trims the todo title", () => {
		const { todos, addTodo } = useTodos();

		addTodo("  Learn Vue  ");

		expect(todos.value[0]?.title).toBe("Learn Vue");
	});

	it("rejects an empty todo", () => {
		const { todos, addTodo } = useTodos();

		const result = addTodo("   ");

		expect(result).toBe(false);
		expect(todos.value).toHaveLength(0);
	});

	it("toggles a todo", () => {
		const { todos, addTodo, toggleTodo } = useTodos();

		addTodo("Learn Vue");

		const todo = todos.value[0];

		expect(todo).toBeDefined();

		if (!todo) {
			return;
		}

		toggleTodo(todo.id);

		expect(todo.completed).toBe(true);

		toggleTodo(todo.id);

		expect(todo.completed).toBe(false);
	});

	it("removes a todo", () => {
		const { todos, addTodo, removeTodo } = useTodos();

		addTodo("Learn Vue");

		const todo = todos.value[0];

		expect(todo).toBeDefined();

		if (!todo) {
			return;
		}

		removeTodo(todo.id);

		expect(todos.value).toHaveLength(0);
	});

	it("updates a todo title", () => {
		const { todos, addTodo, updateTodo } = useTodos();

		addTodo("Learn Vue");

		const todo = todos.value[0];

		expect(todo).toBeDefined();

		if (!todo) {
			return;
		}

		const result = updateTodo(todo.id, "Master Vue");

		expect(result).toBe(true);
		expect(todo.title).toBe("Master Vue");
	});

	it("filters active todos", () => {
		const { todos, filter, filteredTodos, addTodo, toggleTodo } = useTodos();

		addTodo("Active task");
		addTodo("Completed task");

		const completedTodo = todos.value.find(
			(todo) => todo.title === "Completed task",
		);

		expect(completedTodo).toBeDefined();

		if (!completedTodo) {
			return;
		}

		toggleTodo(completedTodo.id);

		filter.value = "active";

		expect(filteredTodos.value).toHaveLength(1);
		expect(filteredTodos.value[0]?.title).toBe("Active task");
	});

	it("filters completed todos", () => {
		const { todos, filter, filteredTodos, addTodo, toggleTodo } = useTodos();

		addTodo("Active task");
		addTodo("Completed task");

		const completedTodo = todos.value.find(
			(todo) => todo.title === "Completed task",
		);

		expect(completedTodo).toBeDefined();

		if (!completedTodo) {
			return;
		}

		toggleTodo(completedTodo.id);

		filter.value = "completed";

		expect(filteredTodos.value).toHaveLength(1);
		expect(filteredTodos.value[0]?.title).toBe("Completed task");
	});

	it("computes the remaining todo count", () => {
		const { todos, remainingCount, addTodo, toggleTodo } = useTodos();

		addTodo("First task");
		addTodo("Second task");

		expect(remainingCount.value).toBe(2);

		const todo = todos.value[0];

		expect(todo).toBeDefined();

		if (!todo) {
			return;
		}

		toggleTodo(todo.id);

		expect(remainingCount.value).toBe(1);
	});
});
