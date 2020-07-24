import * as constMap from "./constMap";
export default {
  localStorageSet(key, value) {
    if (typeof value == "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  localStorageGet(key) {
    if (localStorage.getItem(key) == null || localStorage.getItem(key) == "") {
      return null;
    } else {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return localStorage.getItem(key);
      }
    }
  },
  localStorageClear() {
    localStorage.clear();
  },
  localStorageRemove(key) {
    localStorage.removeItem(key);
  },
  sessionLocalStorageSet(key, value) {
    if (typeof value == "object") {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  sessionLocalStorageGet(key) {
    if (
      sessionStorage.getItem(key) == null ||
      sessionStorage.getItem(key) == ""
    ) {
      return null;
    } else {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch (error) {
        return sessionStorage.getItem(key);
      }
    }
  },
  merge(args1, args2) {
    let newArgs1 = JSON.parse(JSON.stringify(args1));
    let newArgs2 = JSON.parse(JSON.stringify(args2));
    return Object.assign({}, args1, args2);
  },
  sessionLocalStorageClear() {
    sessionStorage.clear();
  },
  sessionLocalStorageRemove(key) {
    sessionStorage.removeItem(key);
  },
  analysisElevator(elevator) {
    if (parseInt(elevator) > 0) {
      return "有配套";
    } else {
      return "无配套";
    }
  },
  countMapFilter(value, ListName = "ROOMTYPE", resultValue = null) {
    let result = constMap[ListName].filter(
      item => parseInt(item.value) == parseInt(value)
    );
    return result.length > 0 ? result[0].key : resultValue;
  },
  //添加房源数据对比
  diffGet(rData, nowData) {
    let newData = JSON.parse(JSON.stringify(rData));
    let newnowData = JSON.parse(JSON.stringify(nowData));
    for (let item in newData) {
      if (newnowData[item] != undefined) {
        if (JSON.stringify(newnowData[item]) == JSON.stringify(rData[item])) {
          delete newnowData[item];
        }
      } else if (newData[item] == null) {
        delete newnowData[item];
      }
    }
    return newnowData;
  },
  find(list, f) {
    return list.filter(f)[0];
  },
  deepCopy(obj, cache = []) {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }
    const hit = find(cache, c => c.original === obj);
    if (hit) {
      return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    cache.push({
      original: obj,
      copy
    });
    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache);
    });
    return copy;
  },
  isNull(value) {
    if (value != 0 && (value === "" || value === null)) {
      return true;
    }
    return false;
  },
  isNotNull(value) {
    if (value != "" && value !== null) {
      return true;
    }
    return false;
  },
  isNumber(number) {
    let flag = true;
    let myreg = /^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*)|0)$/;
    if (myreg.test(number)) {
      flag = false;
    }
    return flag;
  },
  timeToStr(time) {
    var m = 0,
      s = 0,
      _m = "00",
      _s = "00";
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? "0" + s : s + "";
    _m = m < 10 ? "0" + m : m + "";
    return _m + ":" + _s;
  },
  //节流
  throttle(delay, callback) {
    let timeoutID;
    let lastExec = 0;

    function wrapper() {
      const self = this;
      const elapsed = Number(new Date()) - lastExec;
      const args = arguments;

      function exec() {
        lastExec = Number(new Date());
        callback.apply(self, args);
      }

      clearTimeout(timeoutID);

      if (elapsed > delay) {
        exec();
      } else {
        timeoutID = setTimeout(exec, delay - elapsed);
      }
    }

    return wrapper;
  },
  //防抖
  debounce(delay, callback) {
    let timeoutID;

    function wrapper() {
      const self = this;
      const args = arguments;

      function exec() {
        callback.apply(self, args);
      }

      clearTimeout(timeoutID);

      timeoutID = setTimeout(exec, delay);
    }

    return wrapper;
  },
  getElementTop(el) {
    if (!el) return null;
    let actualTop = el.offsetTop;
    let current = el.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  },
  format(time, fmt) {
    let date = new Date(time);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  },
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return null;
  },
  openPage(pageParams) {
    window.open(this.$router.resolve(pageParams).href, "_blank");
  },
  //获取指定class的父节点
  getParents(element, className) {
    var returnParentElement = null;
    function getParentNode(element, className) {
      if (
        !element ||
        !element.tagName ||
        element.tagName.toLowerCase() == "body" ||
        element.tagName.toLowerCase() == "html"
      ) {
        return null;
      }
      if (element && element.classList.contains(className)) {
        returnParentElement = element;
      } else {
        getParentNode(element.parentElement, className);
      }
    }
    getParentNode(element, className);

    return returnParentElement;
  }
};
