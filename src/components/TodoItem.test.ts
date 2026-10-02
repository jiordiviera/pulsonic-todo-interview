import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem.vue";

const todo: Todo = {
	id: "todo-1",
	title: "Learn Vue",
	completed: false,
	createdAt: "2026-10-02T08:00:00.000Z",
};

describe("TodoItem", () => {
	it("renders the todo title", () => {
		const wrapper = mount(TodoItem, {
			props: { todo },
		});

		expect(wrapper.text()).toContain("Learn Vue");
	});

	it("emits toggle with the todo id", async () => {
		const wrapper = mount(TodoItem, {
			props: { todo },
		});

		await wrapper.get('input[type="checkbox"]').trigger("change");

		expect(wrapper.emitted("toggle")).toEqual([["todo-1"]]);
	});

	it("emits remove with the todo id", async () => {
		const wrapper = mount(TodoItem, {
			props: { todo },
		});

		await wrapper.get('button[aria-label="Delete Learn Vue"]').trigger("click");

		expect(wrapper.emitted("remove")).toEqual([["todo-1"]]);
	});

	it("allows editing a todo", async () => {
		const wrapper = mount(TodoItem, {
			props: { todo },
		});

		await wrapper.get('button[aria-label="Edit Learn Vue"]').trigger("click");

		const input = wrapper.get('input[type="text"]');

		await input.setValue("Master Vue");
		await wrapper.get("form").trigger("submit");

		expect(wrapper.emitted("update")).toEqual([["todo-1", "Master Vue"]]);
	});

	it("enters edit mode from the edit button", async () => {
		const wrapper = mount(TodoItem, {
			props: { todo },
		});

		await wrapper.get('button[aria-label="Edit Learn Vue"]').trigger("click");

		expect(wrapper.find('input[type="text"]').exists()).toBe(true);
	});
});
