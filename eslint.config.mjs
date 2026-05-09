import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  // Global ignores
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      "*.config.*",
      "vitest.setup.ts",
      "**/*.js",               // legacy scripts, config files
      "postcss.config.mjs",
    ],
  },

  // Base ESLint recommended
  eslint.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // Next.js plugin rules
  {
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Project-specific overrides
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },

  // Layout: dev-only React Grab scripts are intentional
  {
    files: ["src/app/layout.tsx"],
    rules: {
      "@next/next/no-sync-scripts": "off",
    },
  },
);
