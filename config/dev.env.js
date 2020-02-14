"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
//修改完记得重启项目
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"http://bweb.ngrok.5fanqie.com/"'
});
