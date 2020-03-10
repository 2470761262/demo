export default {
  localStorageSet(key, value) {
    if (typeof value == "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  localStorageGet(key) {
    if (localStorage.getItem(key) == null || localStorage.getItem(key) == '') {
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
    localStorage.clear()
  },
  localStorageRemove(key) {
    localStorage.removeItem(key);
  },
  analysisElevator(elevator) {
    if (parseInt(elevator) > 0) {
      return "有配套";
    } else {
      return "无配套";
    }
  },
  analysisSign(sign) {
    switch (sign) {
      case 1:
        return "占用";
      case 0:
        return "未占用";
      default:
        return "无"
    }
  },
  analysisHouseBelong(houseBelongList, houseBelong) {
    var str = "无"
    houseBelongList.forEach(element => {
      if (element.id == parseInt(houseBelong)) {
        str = element.name;
      }
    });
    return str;
  },
  analysisLandCharacteristic(landCharacteristic) {
    switch (landCharacteristic) {
      case "0":
        return "出让";
      case "1":
        return "划拨";
      default:
        return "无"
    }
  },
  //添加房源数据对比
  diffGet(rData, nowData) {
    var rData = JSON.parse(JSON.stringify(rData));
    var nowData = JSON.parse(JSON.stringify(nowData));
    for (let item in rData) {
      if (nowData[item] != undefined) {
        if (JSON.stringify(nowData[item]) == JSON.stringify(rData[item])) {
          delete nowData[item];
        }
      } else if (rData[item] == null) {
        delete nowData[item];
      }
    }
    return nowData;
  },
  find(list, f) {
    return list.filter(f)[0]
  },
  deepCopy(obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    const hit = find(cache, c => c.original === obj)
    if (hit) {
      return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}
    cache.push({
      original: obj,
      copy
    })
    Object.keys(obj).forEach(key => {
      copy[key] = this.deepCopy(obj[key], cache)
    })
    return copy
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
      _m = '00',
      _s = '00';
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    return _m + ":" + _s;
  }
}
