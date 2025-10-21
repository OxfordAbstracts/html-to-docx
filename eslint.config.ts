import stylistic from "@stylistic/eslint-plugin"
// @ts-expect-error  Could not find a declaration file
import eslintConfJs from "eslint-config-javascript"
import globals from "globals"

export default [
  ...eslintConfJs,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "space-before-function-paren": "off",
      "id-length": "off",
    },
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    files: ["src/utils/xml-sanitizer.ts"],
    rules: {
      "no-control-regex": "off",
    },
  },
  {
    ignores: ["dist/*"],
  },
]
