"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
const developUrl = "http://bweb.yongxinjia.com/";
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"' + developUrl + '"'
});
