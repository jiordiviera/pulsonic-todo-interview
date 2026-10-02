import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), tailwindcss()],
	test: {
		// simule un navigateur pour les tests unitaires, ce qui est utile pour tester des composants Vue qui utilisent le DOM
		environment: "happy-dom",
	},
});
