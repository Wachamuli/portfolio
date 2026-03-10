// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: "standalone",
  }),

  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
