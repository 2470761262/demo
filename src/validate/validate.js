import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import veeMessage from "vee-validate/dist/locale/zh_CN";
const config = {
  errorBagName: "errors",
  fieldsBagName: "fields",
  delay: 100,
  locale: "zh_CN",
  strict: true,
  enableAutoClasses: true,
  events: "blur|input",
  inject: true
};

Vue.use(VeeValidate, config);
// 使用中文提示
Validator.localize("zh_CN", veeMessage);
