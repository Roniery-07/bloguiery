import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  prettierConfig,
]);
