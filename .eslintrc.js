module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-unused-vars": "off",
    "prettier/prettier": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
