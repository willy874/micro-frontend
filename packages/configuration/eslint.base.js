module.exports = {
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
      },
    ],
  },
};
