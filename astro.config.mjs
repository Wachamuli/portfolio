// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({
        access: "secret",
        context: "server",
      }),
      GITHUB_ACCESS_TOKEN: envField.string({
        access: "secret",
        context: "server",
      }),
    },
  },
});
