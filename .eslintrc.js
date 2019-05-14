module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential"
    // "@vue/prettier"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    // "no-unused-vars": [
    //   "error",
    //   { vars: "all", args: "after-used", ignoreRestSiblings: false }
    // ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
