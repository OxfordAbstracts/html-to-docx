import stylistic from "@stylistic/eslint-plugin"
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
    ignores: ["dist/*"],
  },
]
