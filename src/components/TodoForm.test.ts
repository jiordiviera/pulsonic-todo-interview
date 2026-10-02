import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TodoForm from "./TodoForm.vue";

describe("TodoForm", () => {
	it("emits an add event with the todo title", async () => {
		const wrapper = mount(TodoForm);

		await wrapper.get("input").setValue("Learn Vue");
		await wrapper.get("form").trigger("submit");

		expect(wrapper.emitted("add")).toEqual([["Learn Vue"]]);
	});

	it("trims the title before emitting it", async () => {
		const wrapper = mount(TodoForm);

		await wrapper.get("input").setValue("  Learn Vue  ");
		await wrapper.get("form").trigger("submit");

		expect(wrapper.emitted("add")).toEqual([["Learn Vue"]]);
	});

	it("does not emit an empty todo", async () => {
		const wrapper = mount(TodoForm);

		await wrapper.get("input").setValue("   ");
		await wrapper.get("form").trigger("submit");

		expect(wrapper.emitted("add")).toBeUndefined();
	});

	it("clears the input after submission", async () => {
		const wrapper = mount(TodoForm);
		const input = wrapper.get("input");

		await input.setValue("Learn Vue");
		await wrapper.get("form").trigger("submit");

		expect((input.element as HTMLInputElement).value).toBe("");
	});
});
