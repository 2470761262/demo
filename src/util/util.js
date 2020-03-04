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
  diffGet(rData, nowData) {
    var rData = JSON.parse(JSON.stringify(rData));
    var nowData = JSON.parse(JSON.stringify(nowData));
    for (let item in rData) {
      if (nowData[item] != undefined) {
        if (JSON.stringify(nowData[item]) == JSON.stringify(rData[item])) {
          delete nowData[item];
        }
      }
    }
    return nowData;
  },
  isNull(value) {
    if (value != 0 && (value === "" || value === null)) {
      return true;
    }
    return false;
  },
  isNotNull(value) {
    if ( value != "" && value !== null) {
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
  }
}
