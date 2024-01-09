module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}",
      ],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: [
      "error",
      2,
    ],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always",
    ],
    "arrow-spacing": [
      "error", { before: true, after: true },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "always",
    ],
    "no-console": 0,
    // "consistent-return": 0,
  },
};