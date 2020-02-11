export default {
  localStorageSet (key, value) {
    if (typeof value == "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  localStorageGet (key) {
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
  localStorageClear () {
    localStorage.clear()
  },
  localStorageRemove (key) {
    localStorage.removeItem(key);
  }
}


