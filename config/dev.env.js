"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
const developUrl = "http://127.0.0.1:8086";
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"' + developUrl + '"'
});
