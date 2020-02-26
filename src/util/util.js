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
    }
    else {
      return "无配套";
    }
  },
  analysisSign(sign) {
    switch(sign){
      case 1:
        return"占用";
        break;
      case 0:
        return "未占用";
        break;
      default : return "无"
    }
  },
  analysisHouseBelong(houseBelongList,houseBelong) {
    var str="无"
    houseBelongList.forEach(element => {
        if(element.id==parseInt(houseBelong)){
               str=element.name;
        }
    });
    return str;
  },
  analysisLandCharacteristic(landCharacteristic) {
    switch(landCharacteristic){
      case "0":
        return"出让";
        break;
      case "1":
        return "划拨";
        break;
      default : return "无"
    }
  },
  isNull(value){
    if(value==""||value==null){
       return true;
    }
    return false;
  },
  
}


