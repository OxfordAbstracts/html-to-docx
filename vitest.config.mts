import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    dir: "tests",
    testTimeout: 50_000,
    pool: "threads",
  },
})
