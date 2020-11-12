import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import veeMessage from "vee-validate/dist/locale/zh_CN";
const config = {
  errorBagName: "errorBags",
  fieldsBagName: "fieldBags",
  delay: 100,
  locale: "zh_CN",
  strict: true,
  enableAutoClasses: true,
  events: "blur|input",
  inject: false
};
//手机号码
Validator.extend("phone", {
  messages: {
    zh_CN: field => field + "格式有误"
  },
  validate: value =>
    !!/^(((13[0-9]{1})|(19[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(
      value
    )
});
//手机号码长度
Validator.extend("phoneLen", {
  messages: {
    zh_CN: field => field + "必须是11位"
  },
  validate: value => !!/^(\d{11})$/.test(value)
});
//正整数
Validator.extend("noZero", {
  messages: {
    zh_CN: field => field + "需要是正整数"
  },
  validate: value => /^[1-9]\d*$/.test(value)
});
//正整数可以为0
Validator.extend("zero1", {
  messages: {
    zh_CN: field => field + "需要是正整数"
  },
  validate: value => /^[0-9]\d*$/.test(value)
});
//正整数和小数点后两位
Validator.extend("flota", {
  messages: {
    zh_CN: field => field + "需要是正整数和正小数,小数点不超过两位"
  },
  validate: value =>
    /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value)
});
//要么不输，要输只能输入正整数和正小数，且不为0
Validator.extend("noZero1", {
  messages: {
    zh_CN: field => field + "正整数和正小数，且不为0"
  },
  validate: value =>
    /^(?!0$|0\.00|0\.0|0\d+$)([1-9]?\d+(\.\d*)|(\\s&&[^\\f\\n\\r\\t\\v])|([1-9]*[1-9][0-9]*)?)$/.test(
      value
    )
});
//要么不输，要输只能输入正整数和正小数，且可以0
Validator.extend("zero", {
  messages: {
    zh_CN: field => field + "正整数和正小数"
  },
  validate: value =>
    /^([1-9]?\d+(\.\d*)|(\\s&&[^\\f\\n\\r\\t\\v])|0|([1-9]*[1-9][0-9]*)?)$/.test(
      value
    )
});
//比较大小
Validator.extend("isGreater", {
  compare: ["compare", "title"],
  messages: {
    zh_CN: (field, args) => {
      if (args[1]) {
        return `${field}不能大于${args[1]}:${args[0] == "" ? 0 : args[0]}`;
      } else {
        return `${field}不能大于${args[0]}`;
      }
    }
  },
  validate: (value, compare) => {
    if (compare[2] && compare[0] == "") {
      //传递第3个参数true则会第一次不匹配
      return true;
    }
    return Number(value) <= Number(compare[0] == "" ? 0 : compare[0]);
  }
});
Validator.extend("isLess", {
  compare: ["compare", "title"],
  messages: {
    zh_CN: (field, args) => {
      if (args[1]) {
        return `${field}不能小于${args[1]}:${args[0] == "" ? 0 : args[0]}`;
      } else {
        return `${field}不能小于${args[0]}`;
      }
    }
  },
  validate: (value, compare) => {
    if (compare[2] && compare[0] == "") {
      //传递第3个参数true则会第一次不匹配
      return true;
    }
    return Number(value) >= Number(compare[0] == "" ? 0 : compare[0]);
  }
});
//比较是否相同
Validator.extend("isSame", {
  compare: ["List", "title"],
  messages: {
    zh_CN: (field, args) => {
      return `不能出现重复的${args[1]}`;
    }
  },
  validate: (value, compare) => {
    return compare[0].length == new Set(compare[0]).size;
  }
});
//中文
Validator.extend("isChinese", {
  messages: {
    zh_CN: field => field + "需要是中文"
  },
  validate: value => {
    return /^[\u4e00-\u9fa5]+$/.test(value);
  }
});
//中文长度
Validator.extend("chineseLen", {
  messages: {
    zh_CN: field => field + "不得少于两个字"
  },
  validate: value => value.length > 1
});

//arrLength
Validator.extend("arrGTLength", {
  compare: ["length", "message"],
  messages: {
    zh_CN: (field, args) => {
      if (args[1] == undefined) return field + "长度不能小于" + args[0];
      return args[1];
    }
  },
  validate: (value, compare) => {
    return value > parseInt(compare[0]);
  }
});

//中文长度不少于10个
Validator.extend("chineseLens", {
  messages: {
    zh_CN: field => field + "不得少于10个字"
  },
  validate: value => value.length > 9
});
//长度不超过多少
Validator.extend("overstep", {
  messages: {
    zh_CN: (field, args) => {
      return field + "不超过" + args[0] + "个字";
    }
  },
  validate: (value, compare) => {
    return value.length <= compare[0];
  }
});

Validator.extend("arrFlatLength", {
  compare: ["length", "message"],
  messages: {
    zh_CN: (field, args) => {
      if (args[1] == undefined) return field + "长度不能小于" + args[0];
      return args[1];
    }
  },
  validate: (value, compare) => {
    const keyList = Object.keys(value);
    if (keyList.length == 0) return false;
    let resultLength = keyList.reduce((prev, next, index) => {
      if (index == 1) return [...value[prev], ...value[next]];
      else return [...prev, ...value[next]];
    });
    return resultLength.length > parseInt(compare[0]);
  }
});

Vue.use(VeeValidate, config);
// 使用中文提示
Validator.localize("zh_CN", veeMessage);
