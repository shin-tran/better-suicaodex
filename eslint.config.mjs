import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier",
  ),
  {
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable 'no-explicit-any'
      "@typescript-eslint/no-unused-vars": "off", // Disable 'no-unused-vars'
      "prettier/prettier": [
        "warn",
        {
          // When you change here, also change sync at .prettierrc
          arrowParens: "always", // Always include parens. Example: (x) => x
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false, // Use space instead of tab
          printWidth: 80,
          semi: true, // Add a semicolon at the end of every statement
        },
      ],
    },
  },
];

export default eslintConfig;
