import Vue from "vue";
import VeeValidate, {
  Validator
} from "vee-validate";
import veeMessage from "vee-validate/dist/locale/zh_CN";
const config = {
  errorBagName: "errorBags",
  fieldsBagName: "fieldBags",
  delay: 100,
  locale: "zh_CN",
  strict: true,
  enableAutoClasses: true,
  events: "blur|input",
  inject: true
};
//手机号码
Validator.extend('phone', {
  messages: {
    zh_CN: (field, args) => field + '必须是11位手机号码',
  },
  validate: value => !!/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)
});
Vue.use(VeeValidate, config);
// 使用中文提示
Validator.localize("zh_CN", veeMessage);
