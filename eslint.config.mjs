import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import jest from "eslint-plugin-jest";
import jestDom from "eslint-plugin-jest-dom";
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import testingLibrary from "eslint-plugin-testing-library";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules", "dist"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  comments.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: false,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "@eslint-community/eslint-comments/no-unused-disable": "error",

      "@eslint-community/eslint-comments/disable-enable-pair": [
        "error",
        {
          allowWholeFile: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",

      "react/jsx-uses-react": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: [
      "**/*.test.{js,jsx}",
      "src/spec_helpers/*.js",
      "src/__*__.{js,jsx}",
    ],

    plugins: {
      jest,
      "jest-dom": jestDom,
      "testing-library": testingLibrary,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        require: false,
      },
    },

    rules: {
      ...jest.configs["flat/recommended"].rules,
      ...jestDom.configs["flat/recommended"].rules,
      ...testingLibrary.configs["flat/react"].rules,
      "import/no-extraneous-dependencies": "off",
      "react/display-name": "off",
      "react/jsx-no-bind": "off",
      "react/prop-types": "off",
      "jest/expect-expect": "off",
      "jest/no-standalone-expect": "off",
      "testing-library/no-node-access": "off",
    },
  },
  {
    files: ["examples/**/*"],

    rules: {
      "import/no-extraneous-dependencies": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["eslint.config.mjs", "jest.config.mjs"],

    rules: {
      "import/no-default-export": "off",
    },
  },
);
