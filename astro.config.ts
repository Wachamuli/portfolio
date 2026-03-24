// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://richiezrijo.com/",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
  env: {
    schema: {
      GITHUB_ACCESS_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      RESEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
