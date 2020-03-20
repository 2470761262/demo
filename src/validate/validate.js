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
        zh_CN: (field, args) => field + '格式有误',
    },
    validate: value => !!/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)
});
//手机号码长度
Validator.extend('phoneLen', {
    messages: {
        zh_CN: (field, args) => field + '必须是11位',
    },
    validate: value => !!/^(\d{11})$/.test(value)
});
//正整数
Validator.extend('noZero', {
    messages: {
        zh_CN: (field, args) => field + '需要是正整数',
    },
    validate: value => /^[1-9]\d*$/.test(value)
});
//要么不输，要输只能输入正整数和正小数，且不为0
Validator.extend('noZero1', {
    messages: {
        zh_CN: (field, args) => field + '正整数和正小数，且不为0',
    },
    validate: value => /^(?!0$|0\.00|0\.0|0\d+$)([1-9]?\d+(\.\d*)|(\\s&&[^\\f\\n\\r\\t\\v])|([1-9]*[1-9][0-9]*)?)$/.test(value)
});
//比较大小
Validator.extend('isGreater', {
    compare: ['compare', 'title'],
    messages: {
        zh_CN: (field, args) => {
            return `${field}不能大于${args[1]}:${args[0] == '' ? 0 : args[0]}`
        }
    },
    validate: (value, compare) => {
        console.log(value, compare, "value, compare", value, (compare[0] == '' ? 0 : compare[0]));
        return Number(value) <= Number((compare[0] == '' ? 0 : compare[0]));
    }
});
//中文
Validator.extend('isChinese', {
    messages: {
        zh_CN: (field, args) => field + '需要是中文',
    },
    validate: (value) => {
        return /^[\u4e00-\u9fa5]+$/.test(value)
    }
});
Vue.use(VeeValidate, config);
// 使用中文提示
Validator.localize("zh_CN", veeMessage);
